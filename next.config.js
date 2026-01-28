/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreDuringBuilds:true
    },
     env: {
    BASE_URL: process.env.BASE_URL,
  }
};

export default nextConfig;