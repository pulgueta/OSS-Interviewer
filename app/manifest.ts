import type { MetadataRoute } from 'next';

import { default as translations } from '@/i18n/en.json';

export default function manifest(): MetadataRoute.Manifest {
	return {
		lang: 'en',
		theme_color: '#18181B',
		background_color: '#0C0A09',
		display: 'standalone',
		display_override: ['fullscreen', 'standalone'],
		scope: '/',
		start_url: '/',
		name: translations.og.title,
		description: translations.og.description,
		short_name: translations.og.short_title,
		orientation: 'portrait',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-256x256.png',
				sizes: '256x256',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-384x384.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
