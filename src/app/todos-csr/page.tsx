"use client";
import useGetData from "../hook/useGetData";
import TodoInputForm from "../components/TodoInputForm";
import TodoItemTrue from "../components/TodoItemTrue";
import { useRouter } from "next/navigation";
import TodoItemFalse from "../components/TodoItemFalse";

function TodoCsrPage() {
  const { isError, isLoading } = useGetData();
  const route = useRouter();
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  const goToStatisticButton = () => route.push("/report");

  return (
    <>
      <button
        onClick={goToStatisticButton}
        className="rounded border-2 m-5 p-2 font-bold"
      >
        통계바로가기
      </button>

      <TodoInputForm />

      <TodoItemTrue />
      <TodoItemFalse />
    </>
  );
}

export default TodoCsrPage;
