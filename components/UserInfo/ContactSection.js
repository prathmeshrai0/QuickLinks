import React from "react";

const ContactSection = ({ form, handleChange }) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base/7 font-semibold text-gray-900">
        Contact Information
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Phone Number */}
        <div className="sm:col-span-3">
          <label
            htmlFor="phoneNo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Phone Number 
          </label>
          <div className="mt-2">
            <input
              id="phoneNo"
              name="phoneNo"
              type="tel"  
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.phoneNo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div className="sm:col-span-3">
          <label
            htmlFor="linkedIn"
            className="block text-sm/6 font-medium text-gray-900"
          >
            LinkedIn
          </label>
          <div className="mt-2">
            <input
              id="linkedIn"
              name="linkedIn"
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.linkedIn}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* GitHub */}
        <div className="sm:col-span-3">
          <label
            htmlFor="github"
            className="block text-sm/6 font-medium text-gray-900"
          >
            GitHub
          </label>
          <div className="mt-2">
            <input
              id="github"
              name="github"
              type="url"
              placeholder="https://github.com/username"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.github}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
