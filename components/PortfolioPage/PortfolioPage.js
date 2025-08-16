"use client";
import { useSession } from "next-auth/react";
import React from "react";
import LoadingPage from "../Loading/LoadingPage";

const PortfolioPage = () => {
  const { data: session } = useSession();
  return <>{session?.user ? <div> PortfolioPage</div> : <LoadingPage />}</>;
};

export default PortfolioPage;
