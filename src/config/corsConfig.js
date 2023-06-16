const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    exposedHeaders: 'Access-Control-Allow-Origin'
};

module.exports = cors(corsOptions);