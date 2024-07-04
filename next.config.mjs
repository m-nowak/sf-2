/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/oee/7",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
