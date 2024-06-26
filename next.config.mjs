/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/general",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
