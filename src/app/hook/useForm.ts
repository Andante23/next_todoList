import { useState } from "react";
import useMutate from "./useMutate";

function useForm() {
  const { queryClient, addTodoMutation } = useMutate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const submitButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() !== "" && content.trim() !== "") {
      addTodoMutation.mutate(
        {
          title,
          content,
          isDone: false,
          id: crypto.randomUUID(),
        },
        {
          onSuccess: () => {
            setTitle("");
            setContent("");

            queryClient.invalidateQueries({
              queryKey: [`${process.env.NEXT_PUBLIC_QUERY_KEY}`],
            });
          },
        }
      );
    } else {
      window.alert("추가할수 없습니다.");
    }
  };

  return { title, content, onChangeTitle, onChangeContent, submitButtonClick };
}

export default useForm;
