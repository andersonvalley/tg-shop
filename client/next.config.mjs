/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'api.telegram.org',
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: 'tgrocket.ru',
      },
    ],
  },
  async headers() {
    return [
      {
        // Путь к иконке favicon и его тип
        source: '/favicon.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
        ],
      },
    ]
  },
}

export default nextConfig
