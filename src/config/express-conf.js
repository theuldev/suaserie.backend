const express = require('express');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');
const rolesRoutes = require('../routes/rolesRoutes');
const securityRoutes = require('../routes/securityRoutes');
const serieRoutes = require ('../routes/serieRoutes');
const corsConfig = require('./corsConfig');
const app = express();
app.use(corsConfig)
app.use(express.json());

app.use(
    authRoutes, 
    userRoutes,
    rolesRoutes,
    securityRoutes,
    serieRoutes
    );
module.exports = app;