/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "code-template-next-app-mui-yugioh-images.s3.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
}

export default nextConfig
