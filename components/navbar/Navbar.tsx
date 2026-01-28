"use client";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectMore from "@/assets/navbar/SelectMore";
import hooks from "./hooks";
import SideBar from "./SideBar";
import LinkTag from "./LinkTag";
import Cross from "@/assets/Cross";
import Hamburger from "@/assets/Hamburger";
import Home from "@/assets/Home";
const Navbar = () => {
  const { pathname, session, ifUserInfoAvailable, showSideBar, toggleSideBar } =
    hooks();
  if (
    pathname === "/sign-up" ||
    pathname === "/sign-in" ||
    pathname.startsWith("/portfolio")
  ) {
    return null;
  }
  const grayThemeButton =
    "hover:bg-gray-400 lg:px-5  p-3 py-1.5 rounded-sm   bg-gray-200";
  const blackThemeButton =
    "lg:px-5 p-3 py-1.5 rounded-sm whitespace-nowrap font-bold text-xs bg-gray-900  text-white hover:bg-gray-800";
  return (
    <>
      <nav
        className="bg-gray-50  w-[91%]     h-14 md:h-20    fixed    top-5   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center   md:px-2 px-5 text-black  lg:gap-2  gap-1  z-10 border border-black text-sm   text-center    "
      >
        <Logo customClass={"hidden lg:flex"} />
        <Link
          className="hover:bg-gray-200 lg:px-5  p-3 py-1.5 rounded-sm "
          href="/"
        >
          {/* home svg  */}
          <Home />
        </Link>
        <div className="   navLinks&buttons       flex w-full md:justify-between justify-end  gap-2   items-center ">
          <ul className="       items-center   md:gap-2  lg:gap-4      hidden md:flex       ">
            <LinkTag className={grayThemeButton} tagName="Home" href="/" />
            <SelectMore
              option={["Upcoming Updates", "About Us", "Theme", "Report Issue"]}
            />

            {ifUserInfoAvailable && (
              <LinkTag
                className={grayThemeButton}
                tagName="Update Info"
                href="/update-info"
              />
            )}
          </ul>
          <div className="buttons flex gap-3   justify-center  items-center sm:justify-end             ">
            {session?.user ? (
              <LinkTag
                className={grayThemeButton}
                tagName="Sign out"
                href="/sign-in"
                func={() => signOut({ callbackUrl: "/sign-in" })}
              />
            ) : (
              <>
                <LinkTag
                  className={
                    grayThemeButton +
                    "whitespace-nowrap font-bold text-xs  bg-gray-300"
                  }
                  tagName="Sign in"
                  href="/sign-in"
                />

                <LinkTag
                  className={blackThemeButton}
                  tagName="Sign up free"
                  href="/sign-up"
                />
              </>
            )}
            {ifUserInfoAvailable !== null &&
              (ifUserInfoAvailable ? (
                <LinkTag
                  className={blackThemeButton}
                  tagName="Add Project"
                  href="/project"
                />
              ) : (
                <LinkTag
                  className={blackThemeButton}
                  tagName="Userinfo"
                  href="/user-info"
                />
              ))}
          </div>
        </div>

        {showSideBar ? (
          <Cross func={toggleSideBar} />
        ) : (
          <Hamburger func={toggleSideBar} />
        )}
        {showSideBar && <SideBar />}
      </nav>
    </>
  );
};

export default Navbar;
