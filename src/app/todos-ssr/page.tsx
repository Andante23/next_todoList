import { Todos } from "../types/todo";

async function TodoSsrPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_TODO_URL}`, {
    cache: "no-cache",
  });

  const { todos } = await response.json();

  return (
    <>
      {todos.map((data: Todos) => (
        <div key={data.id} className="rounded border-2 p-2 m-2">
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      ))}
    </>
  );
}

export default TodoSsrPage;
