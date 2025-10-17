"use client"
import Logo from "@/assets/Logo";
import SocialButton from "@/components/Pages/loginPage/socialButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = ({ searchParams, children }) => {
  const [currentPage, setCurrentPage] = useState(null)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {

    (pathname === '/login'  ) ? setCurrentPage('login') : setCurrentPage('signup')
  }, [pathname])


  

  const toggle = () => {

    if (currentPage === 'login') {
      router.push('/signup')
    } else {
      router.push('/login')

    }
  };
  return (
    <>
      <main className="box border  flex h-screen ">
        <section className="left  border   md:w-1/2 w-full  bg-white  text-black max-h-screen overflow-y-scroll ">
          <Logo customClass="h-20 " />
          <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center md:text-sm text-xs ">
            <header className="text-center">
              <h1 className="    text-3xl font-bold">Welcome Back</h1>
              <p className=" text-base   text-gray-500">
                Log in to your QuickLinks
              </p>
            </header>
            {children}

            <h3 className="text-center">OR</h3>
            <div className="authLogin">
              <SocialButton />
            </div>

            {currentPage === 'login' ? <div className="toggle flex justify-center items-center">
              <p>Doesn&apos;t have an account?</p>
              <button
                onClick={toggle}
                className="text-purple-500  font-medium cursor-pointer"
              >
                Sign up
              </button>
            </div> : <div className="toggle flex justify-center items-center">
              <p>Already Registered</p>
              <button
                onClick={toggle}
                className="text-purple-500  font-medium cursor-pointer"
              >
                Login
              </button>
            </div>}
          </div>
        </section>
        <section className="right relative border max-w-1/2 w-1/2   hidden md:block  ">
          <Image
            src="/login.jpg"
            alt="Profile picture"
            fill
            style={{ objectFit: "cover" }}
          />
        </section>
      </main>
    </>
  );
};

export default layout;
