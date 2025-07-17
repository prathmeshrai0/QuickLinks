import React from 'react'
import Script from 'next/script'
import Link from 'next/link'
const Logo = (props) => {
     
    return (
        <>
            <Script src="https://cdn.lordicon.com/lordicon.js" strategy='lazyOnload'></Script>



            <Link  href={"/"} className={`   flex w-min  whitespace-nowrap  h-11   items-center justify-center  ${props.customClass || ""}  ` }>
                <lord-icon className=" "
                    src="https://cdn.lordicon.com/xjugsqts.json"
                    trigger="hover"
                // style="width:250px;height:250px"
                >
                </lord-icon>
                <span className='font-bold text-black text-lg '>Quicklinks</span>
            </Link>
        </>
    )
}

export default Logo