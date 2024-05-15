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
		staleTimes: {
			dynamic: 0,
		}
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

		config.module.rules.push({
			test: /\.wasm$/,
			loader: 'base64-loader',
			type: 'javascript/auto',
		});

		config.module.noParse = /\.wasm$/;

		config.module.rules.forEach((rule) => {
			(rule.oneOf || []).forEach((oneOf) => {
				if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
					oneOf.exclude.push(/\.wasm$/);
				}
			});
		});

		if (!isServer) {
			config.resolve.fallback.fs = false;
		}

		config.plugins.push(
			new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }),
		);

		return config;
	},
};

export default nextConfig;
