import pkg from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withVanillaExtract = pkg.createVanillaExtractPlugin({
  identifiers: "debug",
});

export default withVanillaExtract(nextConfig);
