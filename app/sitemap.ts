import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://viadan.vercel.app/', lastModified: new Date() },
  ]
}
