import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className=' min-h-screen      bg-gray-50 text-gray-900 p-8  pt-28 h-full flex flex-col items-center  '>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Update Info</h1>

      </header>

      <section className='flex gap-7 flex-col w-full items-center justify-center'>
        <Link className="w-full max-w-3xl bg-white p-6 rounded-lg border hover:shadow-md text-center"
        href={'/user-info?update=true'}>
        <p className="text-gray-700">
          Update Personal Info
        </p>
      </Link>
      <Link className="w-full max-w-3xl bg-white p-6 rounded-lg border hover:shadow-md text-center"
      href={'/project?update=true'}>
        <p className="text-gray-700">
          Update Projects Info
        </p>
      </Link>
      </section>
    </main>
  )
}

export default page