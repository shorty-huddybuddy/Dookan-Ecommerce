// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     remotePatterns:[
//       {
//         protocol:"https",
//         hostname:"cdn.sanity.io",
//       }
//     ]
//   }
// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Add this to expose env vars to the server
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // Add other required env vars here (e.g., NEXT_PUBLIC_* if needed)
  },
};

export default nextConfig;