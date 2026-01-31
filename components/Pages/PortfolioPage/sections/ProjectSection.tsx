import React from "react";
import Link from "next/link";
const ProjectSection = ({ UserDetails, allProjects }) => {
  return (
    <section className="max-w-5xl mx-auto       w-full    ">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
        {/* All Projects   */}

        {allProjects.map((ele, key) => {
          return (
            <Link
              key={key}
              href={ele.link}
              target="blank"
              className="flex flex-col bg-white shadow-sm rounded-lg  hover:shadow-2xl transition-all duration-200 p-4 gap-3    min-h-96  "
            >
              <div className="overflow-hidden rounded-md h-40 flex justify-center items-center ">
                {ele.thumbnail ? (
                  <img
                    className="w-fit  h-full object-center sm:object-contain  "
                    src={ele.thumbnail || ""}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-fit  h-full object-center sm:object-contain  "
                    src="/thumbnail.jpeg"
                    alt=""
                  />
                )}
              </div>
              <div className="text-center flex gap-3 flex-col text-base break-words">
                <h4 className="font-semibold text-slate-800">{ele.title}</h4>
                <p className="text-sm font-semibold text-slate-500 uppercase">
                  {ele.category} - {ele.subcategory}
                </p>
                <details className="text-slate-600 font-light text-sm">
                  <summary className="cursor-pointer ">Read more</summary>
                  <p>{ele.description}</p>
                </details>

              </div>
              <div className="flex gap-2 h-fit flex-wrap justify-center text-xs">
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
  );
};

export default ProjectSection;
