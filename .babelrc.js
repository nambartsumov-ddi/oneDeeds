
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "debug": false,
        "modules": false,
        "loose": true,
      }
    ],
    "@babel/react"
  ],
  env: {
    development: {
      plugins: process.env.CLIENT ? ["react-hot-loader/babel"] : []
    },
    production: {}
  }
}
