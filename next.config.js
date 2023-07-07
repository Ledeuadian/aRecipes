/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
},images: {
    domains:[
        "/public/images/",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "edamam-product-images.s3.amazonaws.com"
    ]
    },
    webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
      }
}

module.exports = nextConfig
