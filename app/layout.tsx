import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ViewTransitions } from 'next-view-transitions';

import { ClientProviders } from '@/providers';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Toaster } from '@/components/ui/sonner';
import { default as translations } from '@/i18n/en.json';

import './globals.css';

export const metadata: Metadata = {
	title: {
		default: translations.og.title,
		template: `${translations.og.title} - %s`,
	},
	description: translations.og.description,
	authors: [
		{
			name: translations.og.author.name,
			url: translations.og.author.url,
		},
	],
	creator: translations.og.author.name,
	category: translations.og.category,
	twitter: {
		card: 'summary_large_image',
		creator: translations.og.twitter.creator,
		title: translations.og.twitter.title,
		description: translations.og.twitter.description,
		images: [
			{
				url: '/translations.og.webp',
				width: 1200,
				height: 630,
				alt: translations.og.short_title,
			},
		],
	},
	openGraph: {
		title: translations.og.title,
		locale: 'en_US',
		description: translations.og.description,
		type: 'website',
		siteName: translations.og.short_title,
		images: [
			{
				url: '/translations.og.webp',
				width: 1200,
				height: 630,
				alt: translations.og.short_title,
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			notranslate: true,
		},
	},
	alternates: {
		canonical: '/',
	},
	metadataBase: new URL('https://oss-interviewer.vercel.app/'),
	icons: {
		icon: '/icon.ico',
		shortcut: '/icon-192x192.png',
		apple: '/icon-192x192.png',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{
			media: '(prefers-color-scheme: dark)',
			color: '#18181B',
		},
		{
			media: '(prefers-color-scheme: light)',
			color: '#FFFFFF',
		},
	],
	colorScheme: 'light dark',
	minimumScale: 1,
	initialScale: 1,
	maximumScale: 5,
	viewportFit: 'cover',
	userScalable: true,
	height: 'device-height',
	width: 'device-width',
};

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<ViewTransitions>
			<html
				lang='en'
				className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<body>
					{process.env.NODE_ENV === 'production' && <Analytics />}
					<ClientProviders>
						<Navbar />
						<Toaster richColors position='top-right' />
						{children}
						<Footer />
					</ClientProviders>
				</body>
			</html>
		</ViewTransitions>
	);
};

export default RootLayout;
