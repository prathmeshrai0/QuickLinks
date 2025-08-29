import React from "react";
import {
  PhotoIcon,
  UserCircleIcon, 
} from "@heroicons/react/24/solid";
const ProfileSection = ({
  form,
  handleChange,
  session,
  UnderDevelopmentFeature,
}) => {
  return (
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
          <div className="mt-2 flex items-center   gap-x-8 ">
            {session.user.image ? (
              <img
                className="size-12 text-gray-300 rounded-full"
                src={session.user.image}
                alt=""
              />
            ) : (
              <UserCircleIcon
                aria-hidden="true"
                className="size-12 text-gray-300"
              />
            )}
            <div className=" w-full">
              <label
                htmlFor="profilePic"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Profile Pic Link
              </label>
              <div className="mt-2">
                <input
                  id="profilePic"
                  name="profilePic"
                  type="url"
                  
                  autoComplete="profile-pic"
                  value={form.profilePic}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 shadow-sm"
                />
              </div>
            </div>
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
                    onChange={UnderDevelopmentFeature}
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
  );
};

export default ProfileSection;
