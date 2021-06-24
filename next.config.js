const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
    pwa: {
        dest: "public",
        runtimeCaching
    },
    reactStrictMode: true,
    images: {
        domains: ["ui-avatars.com", "res.cloudinary.com"]
    }
});
