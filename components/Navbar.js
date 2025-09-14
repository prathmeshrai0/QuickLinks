"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { UnderDevelopmentFeature } from "@/utlis/utilities";
const Navbar = () => {
  const pathname = usePathname();
  const hideNavebar = !(
    pathname === "/login" || pathname.startsWith("/portfolio")
  );
  const { data: session } = useSession();
  const [ifUserInfoAvailable, setifUserInfoAvailable] = useState(null);
  const [showSideBar, setshowSideBar] = useState(false)

  useEffect(() => {
    if (session?.user) {
      fetch("api/user")
        .then(res => res.json())
        .then(data => {
          if (data.isAvailable) {
            setifUserInfoAvailable(true);
          } else {
            setifUserInfoAvailable(false);
          }
        });
    }
  }, [session]);
  const toggleSideBar = () => {
    setshowSideBar(prev => (!prev));
  }
  return (
    <>
      {hideNavebar && (
        <nav
          className="bg-white max-w-[91%] w-full   h-20    fixed    top-5   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center px-5 text-black  lg:gap-11  gap-1  z-10 border border-black text-sm   text-center   "
        >
          <Logo customClass={'  hidden lg:flex  '} />
          <svg className="md:hidden size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" /></svg>
          <div className="   navLinks&buttons      flex w-full md:justify-between justify-end  gap-2   items-center ">
            <ul className="    items-center   gap-4       hidden md:flex   ">

              <li className="hover:bg-gray-200 lg:px-5  pr-3 py-1.5 rounded-sm    ">
                <Link className="" href="/">
                  Home
                </Link>
              </li>
              <li className="hover:bg-gray-200 lg:px-5  pr-3 py-1.5 rounded-sm    ">
                <Link className="" href="/upcomingUpdates">
                  Upcoming Updates
                </Link>
              </li>
              <li className="hover:bg-gray-200 lg:px-5 pr-3 py-1.5 rounded-sm    ">
                <Link className="" href="/aboutus">
                  About Us
                </Link>
              </li>
              <li className="hover:bg-gray-200 lg:px-5 pr-3 py-1.5 rounded-sm    ">
                <Link className="" onClick={UnderDevelopmentFeature} href="">
                  Theme
                </Link>
              </li>
              <li className="hover:bg-gray-200 lg:px-5 pr-3 py-1.5 rounded-sm    ">
                <Link className="" onClick={UnderDevelopmentFeature} href="">
                  Report an Issue
                </Link>
              </li>
            </ul>
            <div className="buttons flex gap-2      ">
              {session?.user ? (
                // gray
                <Link
                  href={"/login?action=login"}
                  className=" text-center sm:min-w-24  bg-gray-200 py-3   rounded-sm font-bold w-20 max-h-full h-[75%] px-1 text-xs"
                  onClick={() =>
                    signOut({ callbackUrl: "/login?action=login" })
                  }
                >
                  Sign out
                </Link>
              ) : (
                <>
                  <Link
                    href={"/login?action=login"}
                    className=" text-center sm:min-w-24  bg-gray-200 py-3   rounded-sm font-bold w-20 max-h-full h-[75%] px-1 text-xs"
                  >
                    Log in
                  </Link>
                  <Link
                    href={"/login?action=signup"}
                    className=" text-center custom-button  sm:min-w-36      bg-gray-900 text-white  w-24 max-h-full h-[75%] px-1 text-xs  "
                  >
                    Sign up free
                  </Link>
                </>
              )}
              {ifUserInfoAvailable !== null &&
                (ifUserInfoAvailable ? (
                  <Link
                    href={"/dashboard"}
                    className=" text-center custom-button  sm:min-w-36      bg-gray-900 text-white  w-24 max-h-full h-[75%] px-1 text-xs "
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={"/userinfo"}
                    className=" px-6 bg-gray-200 py-3 rounded-sm font-bold"
                  >
                    Userinfo
                  </Link>
                ))}
            </div>
          </div>

          <svg
            className="w-6 h-6 md:hidden "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSideBar}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {showSideBar && <div className={`fixed  top-20 z-10  -right-[5%]  w-screen    bg-white h-screen  md:hidden     `} >
            <div className="  flex   items-center      gap-5 mt-5    justify-center      flex-col   ">
              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                href="/"
                onClick={toggleSideBar}
              >
                Home
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                href="/upcomingUpdates"
                onClick={toggleSideBar}
              >
                Upcoming Updates
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                href="/aboutus"
                onClick={toggleSideBar}
              >
                About Us
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                onClick={() => {
                  UnderDevelopmentFeature()
                  toggleSideBar()
                }}
                href=""

              >
                Theme
              </Link>
              <Link className="" onClick={UnderDevelopmentFeature} href="">
                Report an Issue
              </Link>


            </div>
          </div>}
        </nav>
      )}
    </>
  );
};

export default Navbar;
