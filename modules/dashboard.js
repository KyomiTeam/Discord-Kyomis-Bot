const express = require('express');
const dashboard = express();
const path = require('path');
const passport =require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const config = require('../config')

module.exports = client => {
    // root/dashboard
    const dashboardDirectory =path.resolve(`${process.cwd()}${path.sep}dashboard`);

    // root/dashboard/templates
    const templatesDirectory = path.resolve(`${dashboardDirectory}${path.sep}templates`);

    // root/dashboard/assets
    dashboard.use('/assets', express.static(path.resolve(`${dashboardDirectory}${path.sep}assets`)));

    passport.use(new Strategy({
        clientID : process.env.CLIENTID,
        clientSecret : process.env.OAUTHSECRET,
        callbackURL : process.env.CALLBACKURL,
        scope : ['identity', 'guilds']
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(()=> done(null, profile));
    }
    ));

    dashboard.use(session({
        store : new MemoryStore({ checkPeriod: 99999999 }),
        secret : process.env.SSECRET,
        resave : false,
        saveUninitialized : false

    }));

    dashboard.use(dashboard.init());
    dashboard.use(passport.session());

    dashboard.engine('html', require('ejs').renderFile);
    dashboard.set('view engine', 'html');

    const renderTemplate = (res, req, template, data = {}) => {
        const baseData = {
            bot : client,
            path : req.path,
            user : req.isAuthenticated() ? req.user : null
        };
        res.render(
            path.resolve(`${templatesDirectory}${path.sep}${template}`),
            Object.assign(baseData, data)
        );
    };

    dashboard.get('/', (req, res) => {
        renderTemplate(res, req, 'home.ejs');
    });

    client.site = dashboard.listen(client.config.dashboard.port)
};