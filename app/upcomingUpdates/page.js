import React from 'react';

const Updates = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8 flex flex-col mt-20 items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Upcoming Updates</h1>
        <p className="text-lg text-gray-600">
          Here’s what we’re working on next for your portfolio experience!
        </p>
      </header>

      <section className="w-full max-w-3xl space-y-6">
        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Theme Options</h2>
          <p className="text-gray-700">
            In the upcoming update, multiple beautiful themes will be available so you can personalize your portfolio appearance with ease.
          </p>
        </article>

        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Portfolio Pages</h2>
          <p className="text-gray-700">
            You will be able to create and manage your actual portfolio page directly from your account, making it easier to showcase your projects.
          </p>
        </article>

        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Cover Pictures & Animated Icons</h2>
          <p className="text-gray-700">
            Upload custom cover pictures and animated icons to make your portfolio more engaging and unique.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Updates;
