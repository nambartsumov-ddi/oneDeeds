# oneDeeds

## TODO:

### Server:

- [ ] Insure the server auto restart - PM2/Forever
- [ ] logging - winston
- [ ] Database - mongodb
- [ ] Server
- [ ] nginx - reverse proxy, load balancer, serve static files, handle TLS, gzip. // https://www.nginx.com/resources/wiki/start/
- [ ] rate limiting
- [ ] Monitoring?
- [ ] Utilize all CPU cores
- [ ] dumper.js
- [ ] Error management (https://goldbergyoni.com/checklist-best-practices-of-node-js-error-handling/)
- [ ] Security checklist (https://blog.risingstack.com/node-js-security-checklist/)
- [ ] 12 factor app https://12factor.net/

### Client:

- [ ] Fix "import/no-unresolved" issues with webpack aliases
- [x] fix webpack-serve historyApiFallback
- [ ] HTML template with html webpack plugin
- [ ] Setup env/rules like react/interpolateHtmlPlugin
- [ ] images loader (file loader and url loader)
- [ ] Public URL
- [x] Copy static files to build
- [ ] configure redux/store/saga/reducers/actions/middleware
- [x] sourcemap Node modules in prod
- [ ] gzip
- [x] split webpack config
- [x] Tree shaking
- [x] Code splitting
- [ ] Lazy Loading
- [x] eslint + prettier
- [x] HMR
- [x] scss and node modules with global styles support
- [x] postcss with autoprefixer
- [x] stylelint
- [x] stylelint - intergrat with webpack
- [x] split scripts to app.js and vendor.js
- [x] Redux
- [x] PropTypes
- [x] redux-logger, redux devtools
- [ ] hmr reducers, expose process.env webpack to client
- [ ] react-router-dom scrollTop() feature ?
- [ ] Class properties, object rest spread
