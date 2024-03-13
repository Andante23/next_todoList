import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todos } from "../types/todo";

function useMutate() {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todos) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_TODO_URL}`, {
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

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_TODO_URL}?id=${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${process.env.NEXT_PUBLIC_QUERY_KEY}`],
      });
    },
  });

  const patchTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: Todos) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_TODO_URL}?id=${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDone: !isDone }),
        }
      );

      const todo = await response.json();
      return todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${process.env.NEXT_PUBLIC_QUERY_KEY}`],
      });
    },
  });

  return { addTodoMutation, deleteTodoMutation, patchTodoMutation };
}

export default useMutate;
