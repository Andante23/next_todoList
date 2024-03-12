import React from "react";

async function AboutPage() {
  const response = await fetch(`http://localhost:3000/api/company`, {
    cache: "force-cache",
  });

  const { companInfo } = await response.json();
  console.log(companInfo);

  return (
    <>
      <div>
        <p>{companInfo.name}</p>
        <p>{companInfo.description}</p>
      </div>
    </>
  );
}

export default AboutPage;
