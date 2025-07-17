import React from "react";

const intro = () => {
  return (
    <section className="bg-[#254f1a] h-[140vh]   relative    ">
      <div className=" absolute bottom-30         h-[65%] flex mx-14  gap-20   ">
        {/* part 1  */}
        <div className="claim flex flex-col   max-w-1/2 gap-9">
          <h2 className="font-extrabold text-[73px] leading-[78px]  text-[#d2e823]">
            Everything you are. In one, simple link in bio.
          </h2>
          <p className="font-bold">
            Join people using QuickLinks for their link in bio. One link to help
            you share everything you create, curate and show your projects to
            Instagram, LinkedIn, Twitter, YouTube and other social media
            profiles.
          </p>
          <form action="" className="flex gap-2.5">
            <input type="text" className="custom-button bg-white rounded-lg" />
            <button className="custom-button bg-[#e9c0e9] text-black py-4">
              Claim your Quicklink
            </button>
          </form>
        </div>
        {/* part 2 */}
        <div className="w-full max-w-md p-4 bg-white border-2 border-black rounded-lg shadow-sm sm:p-8  ">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900  ">
              Latest Customers
            </h5>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline "
            >
              View all
            </a>
          </div>

          <div className="flow-root border-2   ">
            <ul
              role="list"
              className="divide-y divide-gray-200    "
            >
              {[
                {
                  name: "Neil Sims",
                  amount: "$320",
                  img: "/docs/images/people/profile-picture-1.jpg",
                },
                {
                  name: "Bonnie Green",
                  amount: "$3467",
                  img: "/docs/images/people/profile-picture-3.jpg",
                },
                {
                  name: "Michael Gough",
                  amount: "$67",
                  img: "/docs/images/people/profile-picture-2.jpg",
                },
                {
                  name: "Lana Byrd",
                  amount: "$367",
                  img: "/docs/images/people/profile-picture-4.jpg",
                },
                {
                  name: "Thomes Lean",
                  amount: "$2367",
                  img: "/docs/images/people/profile-picture-5.jpg",
                },
              ].map((user, index) => (
                <li
                  key={index}
                  className={`py-3 sm:py-4 ${index === 4 ? "pb-0 sm:pt-4 pt-3" : ""
                    }`}
                >
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.img}
                        alt={`${user.name} image`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate ">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      {user.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default intro;
