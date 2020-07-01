const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/web',
        createProxyMiddleware({
            target: 'https://localhost:8080',
            "secure": false,
            changeOrigin: true,
        })
    );
};