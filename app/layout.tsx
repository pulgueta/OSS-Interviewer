import type { FC, PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ViewTransitions } from 'next-view-transitions';

import { ClientProviders } from '@/providers';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { og } from '@/i18n/en.json';

import './globals.css';

export const metadata: Metadata = {
	title: og.title,
	description: og.description,
	authors: [
		{
			name: og.author.name,
			url: og.author.url,
		},
	],
	creator: og.author.name,
	category: og.category,
	twitter: {
		creator: og.twitter.creator,
		title: og.twitter.title,
		description: og.twitter.description,
	},
	openGraph: {
		title: og.title,
		description: og.description,
		type: 'website',
		siteName: og.short_title,
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

type $RootLayout = Readonly<PropsWithChildren>;

const RootLayout: FC<$RootLayout> = ({ children }) => {
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
						{children}
						<Footer />
					</ClientProviders>
				</body>
			</html>
		</ViewTransitions>
	);
};

export default RootLayout;
