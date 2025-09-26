"use client"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
const ReportIssue = () => {
    const { data: session, status } = useSession();
    // used when user has submitted all details or not
    const [isShowButton, setIsShowButton] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (status === "authenticated") {

            setIsShowButton(true);

        }
    }, [session]);

    const handleReport = () => {

        router.push('/report-issue')
    };
   
    return (
        <>
            {isShowButton && (
                <button
                    type="button"
                    title="Report any issue"
                    className="fixed bottom-5 left-5  text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm size-10  text-center   dark:bg-red-600   dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center justify-center hover:cursor-pointer"
                    onClick={() => {
                        handleReport();
                    }}
                >
                    <svg
                        className="w-6 h-6 text-yellow-500"
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

                </button>
            )}
        </>
    );
};

export default ReportIssue;
