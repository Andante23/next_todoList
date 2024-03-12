// 회사 정보를 가져오는 GET 함수
export async function GET(request: Request) {
    const response = await fetch(`${process.env.COMPANY_API_SERVER_URL}`);
    const companInfo = await response.json();
  
    if (!companInfo) {
      return new Response("Todo is not found", {
        status: 404,
      });
    }
  
    return Response.json({
        companInfo: [
        ...companInfo,
        {
          test: "test",
        },
      ],
    });
  }
  
 