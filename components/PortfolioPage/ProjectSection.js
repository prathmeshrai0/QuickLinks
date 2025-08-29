import React from 'react'
import Link from "next/link";
const ProjectSection = ({ UserDetails, allProjects }) => {
  return (
    <section className="max-w-5xl mx-auto mt-10     ">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
        {/* All Projects   */}
        {/* {allProjects.map((ele, key) => {
          return (
            <Link
              key={key}
              href={ele.link}
              target="blank"

              className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-72     hover:shadow-2xl transition-all duration-200   "
            >
              <div className="m-2.5 overflow-hidden rounded-md h-40 flex justify-center items-center">
                <img
                  className="w-full h-full object-cover"
                  src={ele.thumbnail || ""}
                  alt="thumbnail"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                  {ele.title}
                </h4>
                <p className="text-sm font-semibold text-slate-500 uppercase">
                  {ele.category} - {ele.subcategory}
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                  {ele.description}
                </p>
              </div>
              <div className="flex justify-center p-6 pt-2 gap-7">
                {ele.techStack.map((ele, key) => {
                  return (
                    <span
                      key={key}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{ele}
                    </span>
                  );
                })}
              </div>
            </Link>
          );
        })} */}


        {/* <Link
          href={allProjects[0].link}
          target="blank"
          // className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-72 hover:shadow-2xl transition-all duration-200"
          className="flex flex-col bg-white shadow-sm    rounded-lg  w-80  hover:shadow-2xl transition-all duration-200 p-4 gap-3" 
        >
          <div className="  overflow-hidden rounded-md h-40 flex justify-center items-center">
            <img
              className="w-full h-full object-cover"
              src={allProjects[0].thumbnail || ""}
              alt="thumbnail"
            />
          </div>
          <div className="    text-center flex gap-3 flex-col text-base">
            <h4 className="  font-semibold text-slate-800">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, magnam.
            </h4>
            <p className="text-sm font-semibold text-slate-500 uppercase">
              {allProjects[0].category} - {allProjects[0].subcategory}
            </p>
            <p className="  text-slate-600   font-light   text-sm ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque iste cumque voluptate aperiam illum, dolore quo consectetur aliquam veritatis odit necessitatibus assumenda corporis quod tempore, labore maxime dignissimos, amet recusandae!
            </p>
          </div>
          <div className="flex gap-2       h-fit flex-wrap     ">
            {allProjects[0].techStack.map((ele, key) => {
              return (
                <span
                  key={key}
                  className="  bg-gray-200 p-2 rounded-full  h-min w-min  text-sm font-semibold text-gray-700  "
                >
                  #{ele}
                </span>
              );
            })}
          </div>
        </Link> */}

{allProjects.map((ele, key) => {
  return (
    <Link
      key={key}
      href={ele.link}
      target="blank"
      className="flex flex-col bg-white shadow-sm rounded-lg w-80 hover:shadow-2xl transition-all duration-200 p-4 gap-3"
    >
      {ele.thumbnail && <div className="overflow-hidden rounded-md h-40 flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src={ele.thumbnail || ""}
          alt="thumbnail"
        />
      </div>}
      <div className="text-center flex gap-3 flex-col text-base">
        <h4 className="font-semibold text-slate-800">
          {ele.title}
        </h4>
        <p className="text-sm font-semibold text-slate-500 uppercase">
          {ele.category} - {ele.subcategory}
        </p>
        <p className="text-slate-600 font-light text-sm">
          {ele.description}
        </p>
      </div>
      <div className="flex gap-2 h-fit flex-wrap">
        {ele.techStack.map((tech, idx) => {
          return (
            <span
              key={idx}
              className="bg-gray-200 p-2 rounded-full h-min w-min text-sm font-semibold text-gray-700"
            >
              #{tech}
            </span>
          );
        })}
      </div>
    </Link>
  );
})}



      </div>
    </section>

  )
}

export default ProjectSection