"use client";

import { useQuery } from "@tanstack/react-query";
// import { CompanInfo } from "../types/todo";
import React from "react";

function AboutPage() {
  // 회사데이터를 서버로 부터 가져오는 로직 작성
  const {
    data: companyInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/companinfo`);
      const companinfo = await res.json();
      return companinfo;
    },
  });

  if (isLoading) {
    return <div>로딩중이에요</div>;
  }

  if (isError) {
    return <div>에러에요</div>;
  }

  return (
    <>
      <div>
        <h1>{companyInfo.name}</h1>
        <p>{companyInfo.description}</p>
      </div>
    </>
  );
}

export default AboutPage;
