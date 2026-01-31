import PortfolioPage from "@/components/Pages/PortfolioPage";
import React from "react";
import prisma from "@/prisma/connectDb";
const Portfolio = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;
  const validUsername = decodeURIComponent(username);

  const DataUser = await prisma.user.findFirst({
    where: {
      username: validUsername,
    },
  });

  if (DataUser) {

    const DataUserInfo = await prisma.userInfo.findFirst({
      where: {
        userId: DataUser.id,
      },
      include: { allProjects: true },
    });

    let { email } = DataUser

    var UserDetailsForPortfolio = {
      email: email,
      username: validUsername,
      ...DataUserInfo,
    };
    delete UserDetailsForPortfolio.id;
    delete UserDetailsForPortfolio.userId;
  }

  return (
    <>
      {DataUser ? (
        <PortfolioPage UserDetails={UserDetailsForPortfolio} />
      ) : (<h2 className=" font-bold mx-auto   w-fit ">This user didn&apos;t exists! </h2>
      )}
    </>
  );
};

export default Portfolio;
