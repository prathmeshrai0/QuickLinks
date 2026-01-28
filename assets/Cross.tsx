import React from 'react'

type crossTypes = {
    className ?: string ;
    func ?: ()=>void ;
}
const Cross = ({className,func} : crossTypes) => {
  return (
     <svg
            className={`w-6 h-6 md:hidden` + className}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
  )
}

export default Cross