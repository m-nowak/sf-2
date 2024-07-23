/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/high-volume-1/oee/7",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
