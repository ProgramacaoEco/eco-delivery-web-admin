import pkg from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
};

const withVanillaExtract = pkg.createVanillaExtractPlugin({
  identifiers: "debug",
});

export default withVanillaExtract(nextConfig);
