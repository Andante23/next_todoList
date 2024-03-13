import { useMutation } from "@tanstack/react-query";
import { Todos } from "../types/todo";

function useMutate() {
  // 데이터 추가하기
  const addTodoMutation = useMutation({
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

  const patchTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: Todos) => {
      const response = await fetch(`http://localhost:3000/api/todos?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDone }),
      });

      const todo = await response.json();
      return todo;
    },
  });

  return { addTodoMutation, deleteTodoMutation, patchTodoMutation };
}

export default useMutate;
