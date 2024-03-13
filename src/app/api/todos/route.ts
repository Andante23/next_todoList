export async function GET(request: Request) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}`);
  const todos = await response.json();

  if (!todos) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    todos: [...todos],
  });
}

export async function POST(request: Request) {
  const { title, content } = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title, content, isDone: false }),
  });

  const todo = await response.json();

  return Response.json({
    todo,
  });
}

export async function PATCH(request: Request) {
  const { isDone } = await request.json();

  // 제가 요청한 URL 생성
  const url = new URL(request.url);

  // 컴퓨터가 요청 URL을 찾아요 그리고 거기에서 id를 얻어옴
  const id = url.searchParams.get("id");
  console.log("id", id);

  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ isDone: !isDone }),
  });

  const data = await response.json();

  // console.log(request);
  return Response.json(data);
}

export async function DELETE(request: Request) {
  // 제가 요청한 URL 생성
  const url = new URL(request.url);

  // 컴퓨터가 요청 URL을 찾아요 그리고 거기에서 id를 얻어옴
  const id = url.searchParams.get("id");

  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return Response.json({
      message: "Todo change successfully",
    });
  } else {
    return new Response("Failed to delete Todo", {
      status: 500,
    });
  }
}
