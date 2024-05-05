/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[process.env.NEXT_PUBLIC_APP_HOSTNAME]
    }
};

export default nextConfig;
