async function ReportPage() {
  const response = await fetch(`http://localhost:3000/api/todos`, {
    cache: "force-cache",
  });
  const { todos } = await response.json();

  return (
    <>
      <div>
        <p>현재까지 {todos.length}개의 todolist가 등록되었습니다.</p>
      </div>
    </>
  );
}

export default ReportPage;
