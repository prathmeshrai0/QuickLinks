import Logo from "@/assets/Logo";
import Link from "next/link";
const Footer = () => {
    return (
        <footer className="bg-white       shadow-md   p-3 mt-10 px-6 md:px-20    ">
            <div className="w-full max-w-screen-xl mx-auto     ">
                <div className="sm:flex sm:items-center sm:justify-between       ">
                    <Logo   />
                    <p className=" absolute left-1/2 -translate-x-1/2   ">  Everything you are, in one simple link | Quicklinks</p>
                    <ul className="  flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/about" className="hover:underline me-4 md:me-6">
                                About
                            </Link>
                        </li>

                        <li>
                            <a href="/licensing" className="hover:underline me-4 md:me-6">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Github
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
