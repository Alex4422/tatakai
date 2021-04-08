const redoc = require('redoc-express');

module.exports = app => {
    app.get('/api/docs/swagger.yaml', (req, res) => {
        res.sendFile('swagger.yaml', { root: '.' });
    });
    
    app.get(
        '/api/docs',
        redoc({
        title: 'API Docs',
        specUrl: '/docs/swagger.yaml'
        })
    );
}