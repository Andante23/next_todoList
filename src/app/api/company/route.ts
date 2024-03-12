// 회사 정보를 가져오는 GET 함수
export async function GET(request: Request) {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const companInfo = await response.json();

  if (!companInfo) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  console.log(companInfo);

  return Response.json({
    companInfo,
  });
}
