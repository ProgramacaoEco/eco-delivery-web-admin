import pkg from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

const withVanillaExtract = pkg.createVanillaExtractPlugin({
  identifiers: "debug",
});

export default withVanillaExtract(nextConfig);
