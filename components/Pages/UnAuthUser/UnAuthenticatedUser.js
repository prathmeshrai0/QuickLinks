import Link from 'next/link'
import React from 'react'

const UnAuthenticatedUser = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span className="text-gray-900">Create?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-6 ">
            Sign up now to unlock personalized features and start building your own Quicklinks.  <br/> No account yet? Sign In now  !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?action=login"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/login?action=signup"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM10 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3zM10 9a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9zM10 15a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"
                />
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UnAuthenticatedUser