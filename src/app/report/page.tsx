async function ReportPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}`, {
    cache: "no-cache",
  });

  console.log(response);

  const todos = await response.json();
  console.log(todos);

  return (
    <>
      <article className="p-10 rounded  border-2  m-5 text-3xl">
        <p className="p-10 rounded border-2 m-5 text-3xl">
          현재 할일 목록 : <b>{todos.length}</b>개
        </p>
      </article>
    </>
  );
}

export default ReportPage;
