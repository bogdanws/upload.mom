/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		instrumentationHook: true,
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/upload',
				permanent: false,
			},
		]
	}
}

module.exports = nextConfig
