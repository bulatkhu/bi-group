const {
  createProxyMiddleware,
} = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/access',
    createProxyMiddleware({
      target: 'https://adfs.bi.group/adfs/oauth2/token',
      changeOrigin: true,
    })
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://test-api-media.bi.group',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '/api': '',
      },
    })
  )
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
    })
  )
}
