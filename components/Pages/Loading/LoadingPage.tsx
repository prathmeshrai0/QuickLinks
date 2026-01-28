import React from 'react'

const LoadingPage = (props : {className ?: String}) => {
    return (
        <div className={`flex space-x-2 justify-center items-center border  bg-gray-100   h-full  self-center mx-auto  dark:invert min-h-screen  ${props.className ||""}`}>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
        </div>
    )
}

export default LoadingPage