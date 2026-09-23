import type { NextConfig } from 'next';
import imageWidths from './src/lib/image-widths.json';

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: false,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: imageWidths.filter((width) => width >= 320),
    imageSizes: imageWidths.filter((width) => width < 320),
  },
};

export default nextConfig;
