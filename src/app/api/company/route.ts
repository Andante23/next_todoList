export async function GET(request: Request) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_COMPANY_URL}`);
  const companyInfo = await response.json();

  if (!companyInfo) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    companyInfo,
  });
}
