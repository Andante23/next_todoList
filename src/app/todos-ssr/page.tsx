import Link from "next/link";
import { Todos } from "../types/todo";

async function TodoSsrPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}`, {
    cache: "no-cache",
  });

  const todos = await response.json();
  console.log(todos);

  return (
    <>
      {todos.map((data: Todos) => (
        <div key={data.id} className="rounded border-2 p-2 m-2">
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      ))}

      <Link href={"/report"}>통계페이지로</Link>
    </>
  );
}

export default TodoSsrPage;
