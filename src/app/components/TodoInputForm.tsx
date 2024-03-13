import useForm from "../hook/useForm";

function TodoInputForm() {
  const { title, content, onChangeContent, onChangeTitle, submitButtonClick } =
    useForm();
  return (
    <>
      <section>
        <form
          className="flex-col items-center justify-center"
          onSubmit={submitButtonClick}
        >
          <div className="flex items-center flex-col justify-center ">
            <div className="m-5 ">
              <label htmlFor="title" className="pr-4 font-bold">
                Title
              </label>
              <br></br>
              <input
                className="w-96  border-2 "
                id="title"
                type="text"
                value={title}
                onChange={onChangeTitle}
                placeholder="주제를 입력해주세요"
                required
              />
            </div>

            <div className="m-5">
              <label htmlFor="contents" className="pr-4 font-bold">
                Contents
              </label>
              <br></br>
              <textarea
                className="w-96 h-32  border-2  "
                id="contents"
                value={content}
                onChange={onChangeContent}
                placeholder="내용을 입력해주세요"
                required
              />
            </div>

            <button
              type="submit"
              className="border-2 m-5 p-2 rounded-md border-sky-300 bg-sky-300  hover:bg-sky-400 "
            >
              추가하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default TodoInputForm;
