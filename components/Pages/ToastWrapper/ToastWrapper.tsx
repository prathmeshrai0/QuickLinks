"use client";
import { ToastContainer, toast } from "react-toastify";
import React, { ReactNode } from "react";

const ToastWrapper = ({ children }: { children: ReactNode }) => {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      {children}
    
      <ToastContainer />
    </>
  );
};

export default ToastWrapper;
