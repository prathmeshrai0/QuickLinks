"use client"
import React, { useEffect, useState } from "react";
import LoadingPage from "../Loading/LoadingPage";
import { useRouter } from "next/navigation";
import {
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
const Intro = () => {
  const [LatestCustomers, setLatestCustomers] = useState()
  const router = useRouter();
  const [username, setusername] = useState("")
  useEffect(() => {
    fetch(new URL('api/latestCustomers', process.env.NEXT_PUBLIC_BASE_URL))
      .then(res => res.json())
      .then(data => {

        setLatestCustomers(data.users)
      }) 

  }, [])
  const handleChange = (e) => {
    setusername(e.target.value)

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length > 0) {

      router.push(process.env.NEXT_PUBLIC_BASE_URL + `/login?action=signup&username=${username}`)
    } else {
      alert("Enter Your Username First!")
    }

  }

  return (
    <section className="bg-[#254f1a] min-h-[140vh]         ">
      <div className=" md:pt-40 pt-32     flex-wrap  justify-center        min-h-[65%] flex   md:gap-20  gap-10 px-3 ">
        {/* part 1  */}
        <div className="claim flex flex-col   md:max-w-1/2 gap-9 w-full    ">
          <h2 className="font-extrabold md:text-[73px] text-4xl md:leading-[78px] leading-9 break-words md:break-normal text-[#d2e823]">
            Everything you are. In one, simple link in bio.
          </h2>
          <p className="font-bold text-[#ededed] ">
            Join people using QuickLinks for their link in bio. One link to help
            you share everything you create, curate and show your projects to
            Instagram, LinkedIn, Twitter, YouTube and other social media
            profiles.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2.5   justify-center     flex-wrap">
            <input placeholder="Enter Your Username" onChange={handleChange} value={username} type="text" className="custom-button text-black font-medium font-mono cursor-text bg-white rounded-lg sm:w-auto w-[90%]  " />
            <button type="submit" className="custom-button bg-[#e9c0e9] text-black py-4">
              Claim your Quicklink
            </button>
          </form>
        </div>
        {/* part 2 */}
        <div className="w-full max-w-md p-4 bg-white   border-black rounded-lg shadow-md sm:p-8      ">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900  ">
              Latest Customers
            </h5>

          </div>

          <div className="  border-2 h-96     flex  justify-center ">
            <ul
              role="list"
              className="divide-y divide-gray-200 w-md  overflow-hidden  "
            >
              {LatestCustomers ? LatestCustomers.map((user, index) => (
                <li
                  key={index}
                  className={`py-3 sm:py-4   px-2   w-full ${index === 4 ? "pb-0 sm:pt-4 pt-3" : ""
                    }`}
                >
                  <div className="flex items-center  ">
                    <div className="shrink-0">
                      {user.profilePic.length > 0 ? <img
                        className="w-8 h-8 rounded-full"
                        src={user.profilePic}
                        alt={`${user.firstName} image`}
                      /> : <UserCircleIcon
                        aria-hidden="true"
                        className="w-8 h-8 bg-gray-400   rounded-full text-gray-300"
                      />}
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate ">

                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      {user.amount}
                    </div>
                  </div>
                </li>
              )) : <LoadingPage className="min-h-20" />}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
