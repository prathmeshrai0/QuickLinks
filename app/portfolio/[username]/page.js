import PortfolioPage from "@/components/Pages/PortfolioPage/PortfolioPage";
import React from "react";
import prisma from "@/prisma/connectDb";
import UnAuthenticatedUser from "@/components/Pages/UnAuthUser/UnAuthenticatedUser";
const Portfolio = async ({ params }) => {
  const { username } = await params;

  const DataUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (DataUser) {
    const DataUserInfo = await prisma.userInfo.findFirst({
      where: {
        userId: DataUser.id,
      },
      include: { allProjects: true },
    });

    let { email } = DataUser;

    const UserDetailsForPortfolio = {
      email: email,
      username: username,
      ...DataUserInfo,
    };
    delete UserDetailsForPortfolio.id;
    delete UserDetailsForPortfolio.userId;
  }

  return (
    <>
      {DataUser ? (
        <PortfolioPage UserDetails={UserDetailsForPortfolio} />
      ) : (<h2 className=" font-bold mx-auto   w-fit ">This user didn't exists! </h2>
      )}
    </>
  );
};

export default Portfolio;
