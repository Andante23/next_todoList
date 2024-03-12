"use client";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Todos } from "../types/todo";

function TodoCsrPage() {
  const queryClient = useQueryClient();
  // 사용자 입력값을 받는 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 데이터 받아오기
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/todos`);

      const todos = await res.json();

      return todos.todos;
    },
  });

  // 데이터 추가하기
  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: Todos) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const todo = await response.json();
      return todo;
    },
  });

  // 데이터 삭제하기
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3000/api/todos?id=${id}`, {
        method: "DELETE",
      });
    },
  });

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
            newTodoMutation.mutate(
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
              <button>변화</button>
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
              <button>변화</button>
            </div>
          ))}
      </section>
    </>
  );
}

export default TodoCsrPage;
