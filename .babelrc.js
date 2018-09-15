
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": { "node": "8.11.3", "uglify": true },
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
