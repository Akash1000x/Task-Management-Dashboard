/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/task-list",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
