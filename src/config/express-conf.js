const express = require('express');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');
const rolesRoutes = require('../routes/rolesRoutes');
const securityRoutes = require('../routes/securityRoutes')
const app = express();

app.use(express.json());

app.use(
    authRoutes, 
    userRoutes,
    rolesRoutes,
    securityRoutes
    );
module.exports = app;