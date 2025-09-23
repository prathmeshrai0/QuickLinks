"use client";

import { useState } from "react";

const ReportPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle API submission later
    console.log("Report submitted:", message);
    alert("Thank you for your report!");
    setMessage("");
  };

  return (
    <main className="flex invert     flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        🚧 This website is currently under development.  
        If you find any issues, reporting them would be greatly appreciated!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <label htmlFor="report" className="block text-gray-700 dark:text-gray-300 mb-2">
          Your Report:
        </label>
        <textarea
          id="report"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the issue here..."
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          rows={5}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
};

export default ReportPage;
