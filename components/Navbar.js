"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { UnderDevelopmentFeature } from "@/utlis/helper";
const Navbar = () => {
  const pathname = usePathname();
  const hideNavebar = !(
    pathname === "/login" || pathname.startsWith("/portfolio")
  );
  const { data: session } = useSession();
  const [ifUserInfoAvailable, setifUserInfoAvailable] = useState(null);
  const [showSideBar, setshowSideBar] = useState(false);

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
    setshowSideBar(prev => !prev);
  };
  return (
    <>
      {hideNavebar && (
        <nav
          className="bg-white  w-[91%]     h-14 md:h-20    fixed    top-5   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center   md:px-2 px-5 text-black  lg:gap-2  gap-1  z-10 border border-black text-sm   text-center   "
        >
          <Logo customClass={"  hidden lg:flex    "} />
          <Link
            className="hover:bg-gray-200 lg:px-5  p-3 py-1.5 rounded-sm "
            href="/"
          >
            <svg
              className="md:hidden size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
            </svg>

          </Link>
          <div className="   navLinks&buttons      flex w-full md:justify-between justify-end  gap-2   items-center ">
            <ul className="    items-center   gap-4       hidden md:flex   ">
              <Link
                className="hover:bg-gray-200 lg:px-5  p-3 py-1.5 rounded-sm "
                href="/"
              >
                Home
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5  p-3 py-1.5 rounded-sm  "
                href="/upcoming-updates"
              >
                Upcoming Updates
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 p-3 py-1.5 rounded-sm"
                href="/about-us"
              >
                About Us
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 p-3 py-1.5 rounded-sm "
                onClick={UnderDevelopmentFeature}
                href=""
              >
                Theme
              </Link>

              {ifUserInfoAvailable && (
                <Link
                  className="hover:bg-gray-200 lg:px-5 p-3 py-1.5 rounded-sm "
                  href="/update-info"
                >
                  Update Info
                </Link>
              )}
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
                    href={"/project"}
                    className=" text-center custom-button  sm:min-w-36      bg-gray-900 text-white  w-24 max-h-full h-[75%] px-1 text-xs "
                  >
                    Add Project
                  </Link>
                ) : (
                  <Link
                    href={"/user-info"}
                    className=" px-6 bg-gray-200 py-3 rounded-sm font-bold"
                  >
                    Userinfo
                  </Link>
                ))}
            </div>
          </div>

          {showSideBar ? (
            <svg
              className="w-6 h-6 md:hidden"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
          )}
          {showSideBar && (
            <div
              className={`fixed  top-14 z-10  -right-[5%]  w-screen    bg-white h-screen  md:hidden     `}
            >
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
                  href="/upcoming-updates"
                  onClick={toggleSideBar}
                >
                  Upcoming Updates
                </Link>

                <Link
                  className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                  href="/about-us"
                  onClick={toggleSideBar}
                >
                  About Us
                </Link>

                <Link
                  className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                  onClick={() => {
                    UnderDevelopmentFeature();
                    toggleSideBar();
                  }}
                  href=""
                >
                  Theme
                </Link>
                {ifUserInfoAvailable && (
                  <Link
                    className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap"
                    href="/update-info"
                     onClick={() => { 
                    toggleSideBar();
                  }}
                  >
                    Update Info
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
