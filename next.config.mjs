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
