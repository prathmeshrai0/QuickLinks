"use client";
import prisma from "@/prisma/connectDb";
import {
  PhotoIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function userCreatingPortfolio() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setform] = useState({
    about: "test-about",
    firstName: "test-first-name",
    lastName: "test-last-name",
    country: "test-country",
    streetAddress: "test-street-address",
    city: "test-city",
    region: "test-region",
    postalCode: "test-postal-code",
    tenthMarks: "test-tenth-marks",
    twelfthMarks: "test-twelfth-marks",
    schoolName: "test-school-name",
    collegeName: "test-college-name",
    graduationCourse: "test-graduation-course",
    graduationCgpa: "test-graduation-cgpa",
    postgrad: "test-postgrad",
    postgradCgpa: "test-postgrad-cgpa",
    phd: "test-phd",
    specialization: "test-specialization",
  });
  const handleChange = e => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
 


  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
       return res.json(); // you need to return here because you are doing within {}
      })
      .then(data => {
        // console.log(data);
        if(data.success){
            router.push('dashboard')
        }
      });
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }
  return (
    <>
      <form className="pb-4">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      quicklinks.com/
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={session?.user?.username || ""}
                      readOnly
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                    value={form.about}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
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
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
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

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
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

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                    value={form.streetAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
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

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                    value={form.region}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                    value={form.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Academic Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Fill in your academic background details below.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="tenth-marks"
                  className="block text-sm font-medium text-gray-900"
                >
                  10th Percentage / CGPA
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tenthMarks"
                    id="tenth-marks"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.tenthMarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="twelfth-marks"
                  className="block text-sm font-medium text-gray-900"
                >
                  12th Percentage / CGPA
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="twelfthMarks"
                    id="twelfth-marks"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.twelfthMarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="school-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  School Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="schoolName"
                    id="school-name"
                    autoComplete="organization"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.schoolName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="college-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  College / University Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="collegeName"
                    id="college-name"
                    autoComplete="organization"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.collegeName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="graduation-course"
                  className="block text-sm font-medium text-gray-900"
                >
                  Graduation Course
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="graduationCourse"
                    id="graduation-course"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.graduationCourse}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="graduation-cgpa"
                  className="block text-sm font-medium text-gray-900"
                >
                  Graduation CGPA / %
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="graduationCgpa"
                    id="graduation-cgpa"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.graduationCgpa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postgrad"
                  className="block text-sm font-medium text-gray-900"
                >
                  Post-Graduation (Optional)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postgrad"
                    id="postgrad"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.postgrad}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postgrad-cgpa"
                  className="block text-sm font-medium text-gray-900"
                >
                  Post-Graduation CGPA / %
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postgradCgpa"
                    id="postgrad-cgpa"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.postgradCgpa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phd"
                  className="block text-sm font-medium text-gray-900"
                >
                  Ph.D. (Optional)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phd"
                    id="phd"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.phd}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-900"
                >
                  Specialization / Topic
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    value={form.specialization}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
