import Link from "next/link";
import React from "react";

const ProfessionalSection = ({ UserDetails, skills, certificates }) => {
  return (
    <section className="max-w-5xl mx-auto       w-full  ">
      <h2 className="text-2xl font-semibold mb-4">Professional Info</h2>
      <div className="subHeading ml-4   mb-5 ">
        <h3 className="text-xl font-semibold mb-4 ">Skills </h3>
        <div className="flex flex-wrap  gap-2 sm:gap-4 text-gray-700">
          {skills.map((ele, key) => {
            return (
              <span
                className="      whitespace-nowrap p-2 rounded-full  w-fit    bg-white    font-bold  border  flex items-center justify-center  "
                key={key}
              >
                {" "}
                <img className="size-5" src={"/offer.png"} alt="" /> {ele}
              </span>
            );
          })}
        </div>
      </div>
      <hr />
      {certificates.length > 0 && (
        <div className="subHeading ml-4 mt-5  ">
          <h3 className="text-xl font-semibold mb-4 ">Certificates </h3>
          <div className="grid grid-cols-1   gap-4 text-gray-700">
            {certificates.map((ele, key) => {
              return (
                <div
                  className="  whitespace-nowrap h-min flex justify-between"
                  key={key}
                >
                  <span className="font-bold">{ele.title}</span>{" "}
                  <Link href={ele.link} target="blank">
                    Link
                  </Link>{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalSection;
