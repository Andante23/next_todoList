"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Todos } from "../types/todo";
import useMutate from "../hook/useMutate";
import { useRouter } from "next/navigation";
function TodoCsrPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addTodoMutation, deleteTodoMutation, patchTodoMutation } =
    useMutate();

  const route = useRouter();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${process.env.NEXT_PUBLIC_QUERY_KEY}`],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_TODO_URL}`);

      const { todos } = await response.json();

      return todos;
    },
  });

  const goToStatisticButton = () => {
    route.push("/report");
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      <button
        onClick={goToStatisticButton}
        className="rounded border-2 m-5 p-2 font-bold"
      >
        통계바로가기
      </button>

      <section>
        <form
          className="flex-col items-center justify-center"
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
                    queryKey: [`todos`],
                  });
                },
              }
            );
          }}
        >
          <div className="flex items-center flex-col justify-center ">
            <div className="m-5 ">
              <label htmlFor="title" className="pr-4 font-bold">
                Title
              </label>
              <br></br>
              <input
                className="w-100  border-2 "
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="m-5">
              <label htmlFor="contents" className="pr-4 font-bold">
                Contents
              </label>
              <br></br>
              <textarea
                className="w-190 border-2  "
                id="contents"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="border-2 m-5 p-2 rounded-md font-bold "
            >
              Add Todo
            </button>
          </div>
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
            <div key={data.id} className="border-black border-2 rounded m-5 ">
              <div className="border-2 m-5">
                <p>{data.title}</p>
                <p>{data.content}</p>
              </div>
              <button
                className="border-2 m-2 rounded-md p-1 font-bold"
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                delete
              </button>
              <button
                className="border-2 m-2 rounded-md p-1 font-bold"
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: true,
                    title,
                    content,
                  });
                }}
              >
                start
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
            <div key={data.id} className="border-black border-2 rounded m-5 ">
              <div className="border-2 m-5">
                <p>{data.title}</p>
                <p>{data.content}</p>
              </div>

              <button
                className="border-2 m-2 rounded-md p-1 font-bold"
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                delete
              </button>
              <button
                className="border-2 m-2 rounded-md p-1 font-bold "
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: false,
                    title,
                    content,
                  });
                }}
              >
                end
              </button>
            </div>
          ))}
      </section>
    </>
  );
}

export default TodoCsrPage;
