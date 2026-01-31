import React from 'react'
import Link from "next/link";
import {
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
const HeaderSection = ({UserDetails}) => { 
  
  return ( 
        <header className="bg-white  shadow-md sm:py-10 py-3   border   flex justify-around  px-7      ">
          <div className="max-w-5xl     flex flex-col md:flex-row md:justify-between md:items-center    ">
            <div>
              <h1 className="sm:text-4xl text-2xl font-bold mb-2">
                {UserDetails.firstName} {UserDetails.lastName}
              </h1>
              <p className="text-gray-600 sm:text-lg text-base">@{UserDetails.username}</p>
              <Link
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${UserDetails.email}&su=Hello&body=Hi%20there!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 mt-1"
              >
                {UserDetails.email}
              </Link>
            </div>
          </div>
          {UserDetails.profilePic ?
            <img className="sm:size-32 size-20 rounded-full shadow-md border " src={UserDetails.profilePic} alt="" /> : <UserCircleIcon
              aria-hidden="true"
              className="size-12 text-gray-300"
            />}
        </header>
  )
}

export default HeaderSection