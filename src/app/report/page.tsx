import { Todos } from "../types/todo";

async function ReportPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}`, {
    next: {
      revalidate: 5,
    },
  });
  const todos = await response.json();
  const todoFalse = todos.filter((data: Todos) => data.isDone === false).length;
  const todoTrue = todos.filter((data: Todos) => data.isDone === true).length;

  return (
    <>
      <article className="p-10 rounded  border-2  m-5 text-3xl">
        <p className="p-10 rounded border-2 m-5 text-3xl border-black">
          현재 전체 목록 : <b>{todos.length}</b>개
        </p>
        <p className="p-10 rounded border-2 m-5 text-3xl border-red-400">
          시작전 목록 : <b>{todoFalse}</b>개
        </p>
        <p className="p-10 rounded border-2 m-5 text-3xl border-lime-300">
          종료 목록 : <b>{todoTrue}</b>개
        </p>
      </article>
    </>
  );
}

export default ReportPage;
