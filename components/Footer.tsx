import Logo from "@/assets/Logo";
import Link from "next/link";
const Footer = ({className}) => {
    return (
        <footer className={` bg-white       shadow-md   p-3 mt-10 px-6 md:px-20  ${className}   `}>
            <div className="    mx-auto     ">
                <div className="flex items-center justify-between   md:flex-row flex-col gap-3    ">
                    <Logo  customClass={' '} />
                    <p className="   text-center    ">  Everything you are, in one simple link | Quicklinks</p>
                    <ul className="     flex flex-wrap justify-center   items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/aboutus" className="hover:underline me-4 md:me-6">
                                About Us
                            </Link>
                        </li>

                       
                        <li>
                            <a href="/upcomingUpdates" className="hover:underline">
                                Upcoming Updates
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700  my-2" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
                    © {new Date().getFullYear()}{" "}
                    <Link href="/" className="hover:underline">
                        QuickLinks™
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
