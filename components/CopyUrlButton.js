"use client";
import { fetchFunction } from "@/utlis";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const CopyUrlButton = () => {
  const { data: session, status } = useSession();
  // used when user has submitted all details or not
  const [isShowButton, setIsShowButton] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchFunction("/api/user").then(userData => {
        fetchFunction("/api/aboutProjects").then(projectsData => {
     

          if (userData.isAvailable && projectsData.success) {
            setIsShowButton(true);
          }
        });
      });
    }
  }, [session]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_BASE_URL + "/portfolio/" + session.user.username
    );
  };
  return (
    <>
      {isShowButton && (
        <button
         title="Copy Your URL"
          type="button"
          className="fixed bottom-5 right-5  text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm size-10  text-center   dark:bg-purple-600   dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            handleCopy();
          }}
        >
          <svg
            className="  text-gray-800 dark:text-white  "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default CopyUrlButton;
