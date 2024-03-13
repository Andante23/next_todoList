import useForm from "../hook/useForm";
import useGetData from "../hook/useGetData";
import useMutate from "../hook/useMutate";
import { Todos } from "../types/todo";
import TodoNotExist from "./common/TodoNotExist";

function TodoItemTrue() {
  const { todos } = useGetData();
  const { title, content } = useForm();
  const { deleteTodoMutation, patchTodoMutation } = useMutate();

  const todoTrueData = todos.filter((todo: Todos) => !todo.isDone);

  //  todo를 삭제해주는 함수
  const deleteTodoButtonClick = (id: string) => {
    const isDelete = window.confirm("삭제하시겠습니까?");

    if (isDelete) {
      deleteTodoMutation.mutate(id);
    } else {
      return;
    }
  };

  // todo를 수정해주는 함수
  const changeTodoStateTrueButtonClick = (id: string, isDone?: boolean) => {
    const isPatch = window.confirm("변경하시겠습니까?");

    if (isPatch) {
      patchTodoMutation.mutate({ id, isDone: true, title, content });
    } else {
      return;
    }
  };

  return (
    <>
      <section>
        <h1>
          <b>True</b>
        </h1>

        {todoTrueData.length !== 0 ? (
          <>
            {todoTrueData.map((data: Todos) => (
              <div key={data.id} className="border-black border-2 rounded m-5 ">
                <div className="border-2 m-5">
                  <p>{data.title}</p>
                  <p>{data.content}</p>
                </div>
                <div className="ltr">
                  <button
                    className="border-2 m-2 rounded-md p-1 font-bold"
                    onClick={() => {
                      deleteTodoButtonClick(data.id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="border-2 m-2 rounded-md p-1 font-bold"
                    onClick={() => {
                      changeTodoStateTrueButtonClick(data.id);
                    }}
                  >
                    start
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <TodoNotExist />
        )}
      </section>
    </>
  );
}

export default TodoItemTrue;
