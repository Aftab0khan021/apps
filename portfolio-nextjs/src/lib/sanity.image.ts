import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Image helper functions with optimization
export function getImageUrl(
  source: any,
  width?: number,
  height?: number,
  quality?: number
) {
  if (!source) return null;
  
  let imageBuilder = urlFor(source);
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (quality) imageBuilder = imageBuilder.quality(quality);
  
  return imageBuilder.url();
}

// Responsive image URLs
export function getResponsiveImageUrls(source: any) {
  if (!source) return null;
  
  return {
    mobile: getImageUrl(source, 640, undefined, 80),
    tablet: getImageUrl(source, 1024, undefined, 85),
    desktop: getImageUrl(source, 1920, undefined, 90),
    original: getImageUrl(source),
  };
}

// Optimized image with blur placeholder
export function getOptimizedImage(source: any, width: number, height: number) {
  if (!source) return null;
  
  return {
    src: getImageUrl(source, width, height, 90),
    blurDataURL: getImageUrl(source, 20, 20, 20),
    width,
    height,
  };
}