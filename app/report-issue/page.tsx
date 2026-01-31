"use client";

import LoadingPage from "@/components/Pages/Loading/LoadingPage";
import { fetchFunction } from "@/utlis";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
const ReportPage = () => {
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const [disableSubmit, setdisableSubmit] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      
      alert("sign in first") 
      
      
      router.push("/");
    }
  }, [status ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetchFunction("api/sendReport", { message: message }, "POST").then(data => {
      if (data.success) {
        toast.success("Thank you for your report!");
        setMessage("");
      } else {
        console.error(data);

        toast.error(data.message);
      }
    });
  };
  if (message.length && disableSubmit) {
    setdisableSubmit(false);
  }

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    return (
      <main className="min-h-screen bg-gray-100 text-gray-900 p-8 flex flex-col m-30 items-center border-2 border-black mx-auto max-w-3xl">
        <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          🚧 This website is currently under development. If you find any
          issues, reporting them would be greatly appreciated!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <label
            htmlFor="report"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Report:
          </label>
          <textarea
            id="report"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Describe the issue here..."
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 "
            rows={4}
            required
          />

          <button
            type="submit"
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors    ${disableSubmit ? "cursor-not-allowed" : "cursor-pointer   "
              }  `}
            disabled={disableSubmit}
          >
            Submit Report
          </button>
        </form>
      </main>
    );
  }
};

export default ReportPage;
