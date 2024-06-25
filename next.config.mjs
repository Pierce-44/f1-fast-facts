/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/drivers/hamilton", // on base url load default to showing Hamilton for now
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
