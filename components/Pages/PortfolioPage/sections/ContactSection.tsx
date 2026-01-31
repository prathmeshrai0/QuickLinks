import Link from "next/link";
import React from "react";

const ContactSection = ({ UserDetails }) => {
    return (
        <section className="max-w-5xl mx-auto       w-full  text-center sm:text-left   ">
            <h2 className="text-2xl font-semibold mb-4">Let&apos;s Connect</h2>

            <div className="flex justify-start sm:gap-[33%]  sm:flex-row flex-col  gap-4   text-gray-700">
                {UserDetails.phoneNo && (
                    <div className="font-medium flex gap-1.5 items-center justify-center ">

                        <img className="size-5" src="/phone.svg" alt="" />{" "}
                        {UserDetails.phoneNo}

                    </div>
                )}
                {UserDetails.linkedIn && (
                    <div className="font-medium flex gap-1.5 items-center justify-center ">

                        <img className="size-5" src="/linkedin.svg" alt="" />{" "}
                        <Link href={UserDetails.linkedIn} target="blank">
                            Link
                        </Link>{" "}


                    </div>
                )}
                {UserDetails.github && (
                    <div className="font-medium flex gap-1.5 items-center justify-center ">

                        <img className="size-5" src="/github.svg" alt="" />{" "}
                        <Link href={UserDetails.github} target="blank">
                            Link
                        </Link>{" "}


                    </div>
                )}
              
            </div>
        </section>
    );
};

export default ContactSection;
