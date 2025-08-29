import React from 'react'
import Link from "next/link";
import {
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
const HeaderSection = ({UserDetails}) => {
  return ( 
        <header className="bg-white  shadow-md py-10   border   flex justify-around  ">
          <div className="max-w-5xl     flex flex-col md:flex-row md:justify-between md:items-center    ">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {UserDetails.firstName} {UserDetails.lastName}
              </h1>
              <p className="text-gray-600 text-lg">@{UserDetails.username}</p>
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
            <img className="size-32 rounded-full shadow-md border " src={UserDetails.profilePic} alt="" /> : <UserCircleIcon
              aria-hidden="true"
              className="size-12 text-gray-300"
            />}
        </header>
  )
}

export default HeaderSection