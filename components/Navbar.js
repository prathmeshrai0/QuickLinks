"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/Logo.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const Navbar = () => {
  const pathname = usePathname();
  const hideNavebar = !(pathname === "/login");
  const { data: session } = useSession();
  const [ifUserInfoAvailable, setifUserInfoAvailable] = useState(null);

  useEffect(() => {
    if (session?.user) {
      fetch("api/user")
        .then(res => res.json())
        .then(data => {
          if (data.isAvailable) {
            // router.push("dashboard");
            setifUserInfoAvailable(true);
          } else {
            setifUserInfoAvailable(false);
          }
        });
    }
  }, [session]);
  useEffect(() => {
  }, [ifUserInfoAvailable]);

  return (
    <>
      {hideNavebar && (
        <nav
          className="bg-white w-[91%] h-20  fixed    top-5   left-1/2
  -translate-x-[50%]  rounded-full flex   items-center px-11 text-black  gap-11  z-10 border border-black text-sm "
        >
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
              </li>
              <li className="hover:bg-gray-200 px-5 py-1.5 rounded-sm">
                <Link href="/">test 4</Link>
              </li>
            </ul>
            <div className="buttons flex gap-2">

              {session?.user ? (
                <button
                  className=" px-6 bg-gray-200 py-3 rounded-sm font-bold"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              ) : (
               <>
                  <Link
                    href={"/login?action=login"}
                    className=" px-6 bg-gray-200 py-3 rounded-sm font-bold"
                  >
                    Log in
                  </Link>
                  <Link
                    href={"/login?action=signup"}
                    className=" custom-button   bg-gray-900 text-white   "
                    >
                    Sign up free
                  </Link>
                    </>
                 
              )}
              {ifUserInfoAvailable !== null &&
                (ifUserInfoAvailable ?
                  <Link
                    href={"/dashboard"}
                    className=" custom-button   bg-gray-900 text-white "
                  >
                    Dashboard
                  </Link>
                  :
                  <Link
                    href={"/userinfo"}
                    className=" px-6 bg-gray-200 py-3 rounded-sm font-bold"
                  >
                    Userinfo
                  </Link>
                )}

            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
