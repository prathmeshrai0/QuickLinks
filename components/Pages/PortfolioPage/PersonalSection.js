import React from "react";

const PersonalSection = ({ UserDetails }) => {
  return (
    <>
      <section className="max-w-5xl mx-auto       w-full   ">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-medium">First Name:</span>{" "}
            {UserDetails.firstName}
          </div>
          <div>
            <span className="font-medium">Last Name:</span>{" "}
            {UserDetails.lastName}
          </div>
          {UserDetails.country && (
            <div>
              <span className="font-medium">Country:</span>{" "}
              {UserDetails.country}
            </div>
          )}

          {UserDetails.city && (
            <div>
              <span className="font-medium">City:</span> {UserDetails.city}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto  w-full   ">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
          {UserDetails.about || "No details provided."}
        </p>
      </section>
    </>
  );
};

export default PersonalSection;
