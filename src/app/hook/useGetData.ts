import { useQuery } from "@tanstack/react-query";

function useGetData() {
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

  return { todos, isLoading, isError };
}

export default useGetData;
