import type { ImageLoaderProps } from 'next/image';

export default function localImageLoader({ src, width }: ImageLoaderProps) {
  if (src.endsWith('.svg')) return src;

  if (!src.startsWith('/media/') || src.includes('..') || src.includes('?')) {
    throw new Error(`Responsive images must be local /media/ files: ${src}`);
  }

  const source = src.slice('/media/'.length);
  return `/media/responsive/${source}/${width}.webp`;
}
