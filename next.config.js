/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // output: "export",
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
  // sassOptions: {
  //   additionalData: `$asset-url: '${process.env.NEXT_PUBLIC_S3_BUCKET_URL}';`,
  // },
  // experimental: {
  //   middleware: true,
  // },
  
  async headers() {
    return [
      {
        // Match all CSS and SCSS module files
        source: "/(.*).module.(css|scss)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate", // Prevents caching in browser
          },
        ],
      },
      {
        // Match all other CSS files
        source: "/(.*).(css|scss)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache other CSS files for a year
          },
        ],
      },
      {
        // Match all JS files
        source: "/(.*).js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache JS files for a year
          },
        ],
      },
      {
        // Match all image files
        source: "/(.*).(png|jpg|jpeg|gif|webp|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache images for a year
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
