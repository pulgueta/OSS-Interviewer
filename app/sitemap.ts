import type { MetadataRoute } from 'next';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const url =
		process.env.NODE_ENV === 'production'
			? 'https://www.oss-interviewer.vercel.app'
			: 'http://localhost:3000';

	return [
		{
			url,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${url}/pricing`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${url}/login`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/register`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
	];
}
