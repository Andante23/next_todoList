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

  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ isDone: !isDone }),
  });

  const data = await response.json();

  return Response.json(data);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const response = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return Response.json(data);
}
