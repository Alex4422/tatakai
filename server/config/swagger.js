const options = {
  swaggerDefinition: {
    info: {
      title: 'Tatakai API',
      version: '1.0.0',
      description: 'Tatakai API Endpoints (Documentation).',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = options