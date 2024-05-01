import { fileURLToPath } from 'url';

import createJITI from 'jiti';

const jiti = createJITI(fileURLToPath(import.meta.url));

jiti('./env.server.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
