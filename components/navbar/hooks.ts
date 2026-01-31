import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";


export default () => {


    const pathname = usePathname();

    const { data: session } = useSession();
    const [ifUserInfoAvailable, setifUserInfoAvailable] = useState<boolean | null>(null);
    const [showSideBar, setshowSideBar] = useState(false);

    useEffect(() => {
        if (

            session?.user &&
            !(pathname === "/sign-up" || pathname === "/sign-in" || pathname.startsWith("/portfolio"))
        ) {
            fetch("api/user")
                .then(res => res.json())
                .then(data => {
                    if (data.isAvailable) {
                        setifUserInfoAvailable(true);
                    } else {
                        setifUserInfoAvailable(false);
                    }
                });
        }
    }, [session, pathname]);
    const toggleSideBar = () => {
 
        setshowSideBar(prev => !prev)
    };
    useEffect(() => {
       
    }, [showSideBar])
    

    return {
        pathname,
        session,
        ifUserInfoAvailable,
        showSideBar,
        setifUserInfoAvailable,
        setshowSideBar,
        toggleSideBar,
    }


}