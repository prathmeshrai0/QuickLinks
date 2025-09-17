import React from 'react';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8   pt-28   flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-lg text-gray-600">
          Hello! I am Prathmesh Rai, an engineering graduate. This project allows you to freely generate your own portfolio page.
        </p>
      </header>

      <section className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-700">
          My goal is to provide an easy-to-use platform where anyone can showcase their work professionally.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
