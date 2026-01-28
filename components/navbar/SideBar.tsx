import { UnderDevelopmentFeature } from '@/utlis';
import hooks from './hooks'
import Link from 'next/link';
import React from 'react'

const SideBar = () => {
    const { toggleSideBar ,ifUserInfoAvailable} = hooks()
  return (
      <div
            className={`fixed  top-14 z-10  -right-[5%]  w-screen    bg-white h-screen  md:hidden     `}
          >
            <div className="  flex   items-center      gap-5 mt-5    justify-center      flex-col   ">


              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap "
                href="/upcoming-updates"
                onClick={toggleSideBar}
              >
                Upcoming Updates
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap "
                href="/about-us"
                onClick={toggleSideBar}
              >
                About Us
              </Link>

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap "
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
                  className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap "
                  href="/update-info"
                  onClick={() => {
                    toggleSideBar();
                  }}
                >
                  Update Info
                </Link>
              )}

              <Link
                className="hover:bg-gray-200 lg:px-5 px-1 py-1.5 rounded-sm whitespace-nowrap flex   items-center justify-center  "
                href="/report-issue"
                onClick={toggleSideBar}
              >
                Report Issue  <svg
                  className="w-4 h-4 text-yellow-500 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0zM12 9v4m0 4h.01"
                  />
                </svg>
              </Link>
            </div>
          </div>
  )
}

export default SideBar