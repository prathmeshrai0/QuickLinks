"use client";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectMore from "@/assets/navbar_assets/SelectMore";
import hooks from "./hooks";
import SideBar from "./SideBar";
import LinkTag from "./LinkTag";
import Cross from "@/assets/Cross";
import Hamburger from "@/assets/Hamburger";
import Home from "@/assets/Home";
import { deleteAllLocalStorageData } from "@/utlis";
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

  const Theme1 =
    "  sm:px-5  sm:py-1.5 sm:text p-2 py-1  rounded-sm   bg-secondary text-secondary-foreground  ";
  const Theme2 =
    "sm:px-5 sm:py-1.5 sm:text p-2 py-1 rounded-sm whitespace-nowrap    bg-primary text-primary-foreground ";

  return (
    <>
      <nav
        className="bg-muted  w-[91%]     h-14 md:h-20    fixed    top-5   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center   md:px-2 px-5 text-black  lg:gap-2  gap-1  z-10 border border-black text-xs   text-center  font-bold   "
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
            <LinkTag className={Theme1} tagName="Home" href="/" />
            <SelectMore
              option={["Upcoming Updates", "About Us", "Theme", "Report Issue"]}
              selectclassName={
                "text-xs border-2 sm:px-5 sm:py-1.5   p-2 py-1  rounded-sm  bg-primary  text-secondary-foreground"
              }
              optionclassName={"bg-green "}
              tagName="More"
            />

            {ifUserInfoAvailable && (
              <LinkTag
                className={Theme1}
                tagName="Update Info"
                href="/update-info"
              />
            )}
          </ul>
          <div className="buttons flex gap-3   justify-center  items-center sm:justify-end             ">
            {session?.user ? (
              <LinkTag
                className={Theme1}
                tagName="Sign out"
                href="/sign-in"
                func={() => {
                  deleteAllLocalStorageData();
                  signOut({ callbackUrl: "/sign-in" });
                }}
              />
            ) : (
              <>
                <LinkTag
                  className={Theme1 + "whitespace-nowrap   bg-secondary  "}
                  tagName="Sign in"
                  href="/sign-in"
                />

                <LinkTag
                  className={Theme2}
                  tagName="Sign up free"
                  href="/sign-up"
                />
              </>
            )}
            {ifUserInfoAvailable !== null &&
              (ifUserInfoAvailable ? (
                <LinkTag
                  className={Theme2}
                  tagName="Add Project"
                  href="/project"
                />
              ) : (
                <LinkTag
                  className={Theme2}
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
        {showSideBar && <SideBar toggleSideBar={toggleSideBar} />}
      </nav>
    </>
  );
};

export default Navbar;
