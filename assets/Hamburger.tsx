import React from 'react'

type hamburgerTypes = {
    className ?: string ;
    func ?: ()=>void ;
}
const Hamburger = ({className,func} : hamburgerTypes) => {
  return (
      <svg
            className={"w-6 h-6 md:hidden " + className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={func}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
  )
}

export default Hamburger