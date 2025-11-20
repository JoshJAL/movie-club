import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hcyp2g6agj.ufs.sh',
        port: '',
        pathname: '/f/**'
      }
    ]
  }
};

export default nextConfig;
