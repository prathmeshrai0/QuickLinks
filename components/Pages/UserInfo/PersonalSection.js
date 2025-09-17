import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const PersonalSection = ({ form, handleChange, session }) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base/7 font-semibold text-gray-900">
        Personal Information
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Last name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              readOnly
              value={session?.user?.email || ""}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
            />
          </div>
        </div>
        <div className="sm:col-span-3  ">
          <label
            htmlFor="city"
            className="block text-sm/6 font-medium text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              required
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
              value={form.country}
              onChange={handleChange}
            >
              <option>India</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 grid grid-cols-3 text-black">
            <div className="mb-5">
              <label className="flex items-center cursor-pointer transition-transform duration-200 ease-in-out ">
                <input
                  id="male"
                  value={"male"}
                  name="gender"
                  type="radio"
                  className="mx-2"
                  required
                  onChange={handleChange}
                  checked={form.gender === 'male'}
                />

                <span className="text-base font-semibold">Male</span>
              </label>
            </div>

            <div className="mb-5">
              <label className="flex items-center cursor-pointer transition-transform duration-200 ease-in-out ">
                <input
                  id="female"
                  value={"female"}
                  name="gender"
                  type="radio"
                  className="mx-2"
                  onChange={handleChange}
                  checked={form.gender === 'female'}
                />

                <span className="text-base font-semibold">Female</span>
              </label>
            </div>

            <div className="mb-5">
              <label className="flex items-center cursor-pointer transition-transform duration-200 ease-in-out ">
                <input
                  id="other"
                  value={"other"}
                  name="gender"
                  type="radio"
                  className="mx-2"
                  onChange={handleChange}
                  checked={form.gender === 'other'}
                />

                <span className="text-base font-semibold">Other</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;
