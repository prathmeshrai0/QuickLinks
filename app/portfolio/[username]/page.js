import PortfolioPage from "@/components/Pages/PortfolioPage/PortfolioPage";
import React from "react";
import prisma from "@/prisma/connectDb";
const Portfolio = async ({ params }) => {
  const { username } = await params;

  const DataUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  const DataUserInfo = await prisma.userInfo.findFirst({
    where: {
      userId: DataUser.id,  
    },
    include : {allProjects : true}
  });
 
 


  let { email } = DataUser;

  const UserDetailsForPortfolio = {
    email: email,
    username: username,
    ...DataUserInfo,
  };
  delete UserDetailsForPortfolio.id;
  delete UserDetailsForPortfolio.userId; 
  
  
  
  return (
    <>
    <PortfolioPage  UserDetails={UserDetailsForPortfolio}  />
    </>
  );
};

export default Portfolio;
