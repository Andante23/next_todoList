import { Todos } from "../types/todo";
export const dynamic = "force-dynamic";

async function TodoSsrPage() {
  const response = await fetch(`http://localhost:3000/api/todos`, {
    cache: "no-cache",
  });

  const { todos } = await response.json();
  console.log(todos);

  return (
    <>
      {todos.map((data: Todos) => (
        <div key={data.id}>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      ))}
    </>
  );
}

export default TodoSsrPage;
