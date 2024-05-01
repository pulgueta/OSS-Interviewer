import { fileURLToPath } from 'node:url';

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
	experimental: {
		serverComponentsExternalPackages: ['argon2', 'pg'],
	},
	webpack: (config, { isServer, webpack }) => {
		config.plugins.push(
			new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
				resource.request = resource.request.replace(/^node:/, '');
			}),
		);

		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
			};
		}

		return config;
	},
};

export default nextConfig;
