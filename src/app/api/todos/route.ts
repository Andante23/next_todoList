export async function GET(request: Request) {
  const response = await fetch(`${process.env.TODO_API_SERVER_URL}`);
  const todos = await response.json();

  if (!todos) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    todos: [
      ...todos,
      {
        test: "test",
      },
    ],
  });
}

export async function POST(request: Request) {

  const { title, content } = await request.json();

  const response = await fetch(`${process.env.TODO_API_SERVER_URL}`, {
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
