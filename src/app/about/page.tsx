import React from "react";

async function AboutPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_COMPANY_URL}`);

  const companyInfo = await response.json();
  console.log(companyInfo);

  return (
    <>
      <div className="m-40 flex mt-50 flex-col text-center">
        <p className="p-10 rounded  border-2  m-5 text-3xl">
          {companyInfo.name}
        </p>
        <p className="p-10 rounded  border-2 text-3xl">
          {companyInfo.description}
        </p>
      </div>
    </>
  );
}

export default AboutPage;
