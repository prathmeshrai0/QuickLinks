"use client"
import React from "react";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const pathname = usePathname()
    const hideNavebar = !(pathname === "/login");
 

  return (
    <>
      {hideNavebar &&


        <nav
          className="bg-white w-[91%] h-20  fixed    top-10   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center px-11 text-black  gap-11  z-10 border border-black text-sm ">
          <Logo />
          <div className=" navLinks&buttons   flex w-full justify-between items-center">

            <ul className="flex   items-center gap-10    ">
              {/* (li>Link[href="/"]{test $})*4 */}
              <li className="hover:bg-gray-200 px-5 py-1.5 rounded-sm">
                <Link href="/">test 1</Link>
              </li>
              <li className="hover:bg-gray-200 px-5 py-1.5 rounded-sm">
                <Link href="/">test 2</Link>
              </li>
              <li className="hover:bg-gray-200 px-5 py-1.5 rounded-sm">
                <Link href="/">test 3</Link>
              </li >
              <li className="hover:bg-gray-200 px-5 py-1.5 rounded-sm">
                <Link href="/">test 4</Link>
              </li>

            </ul>

            <div className="flex gap-2">
              <Link href={"/login?action=login"} className=" px-6 bg-gray-200 py-3 rounded-sm font-bold">Log in</Link>
              <Link href={'/login?action=signup'} className=" custom-button   bg-gray-900 text-white   ">Sign up free</Link>
            </div>
          </div>
        </nav>

      }
    </>
  );
};

export default Navbar;
