"use client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Todos } from "../types/todo";
import useMutate from "../hook/useMutate";

function TodoCsrPage() {
  const queryClient = useQueryClient();
  // 사용자 입력값을 받는 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addTodoMutation, deleteTodoMutation, patchTodoMutation } =
    useMutate();

  // 데이터 받아오기
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/todos`);

      const { todos } = await response.json();

      return todos;
    },
  });

  console.log(todos);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      {/* todo 데이터를 추가하는 로직 */}
      <section>
        <h2>새로운 투두 추가하기</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodoMutation.mutate(
              {
                title,
                content,
                isDone: false,
                id: crypto.randomUUID(),
              },
              {
                onSuccess: () => {
                  setTitle("");
                  setContent("");

                  queryClient.invalidateQueries({
                    queryKey: ["todos"],
                  });
                },
              }
            );
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contents">Contents</label>
            <input
              id="contents"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>
      </section>

      {/* 추가한 데이터를 보여주는 로직 */}
      <section>
        <h1>
          <b>True</b>
        </h1>
        {todos
          .filter((todo: Todos) => !todo.isDone)
          .map((data: Todos) => (
            <div key={data.id}>
              <p>{data.title}</p>
              <p>{data.content}</p>
              <button
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: true,
                    title,
                    content,
                  });
                }}
              >
                변화
              </button>
            </div>
          ))}
      </section>

      <section>
        <h1>
          <b>False</b>
        </h1>
        {todos
          .filter((todo: Todos) => todo.isDone)
          .map((data: Todos) => (
            <div key={data.id}>
              <p>{data.title}</p>
              <p>{data.content}</p>
              <button
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: false,
                    title,
                    content,
                  });
                }}
              >
                변화
              </button>
            </div>
          ))}
      </section>
    </>
  );
}

export default TodoCsrPage;
