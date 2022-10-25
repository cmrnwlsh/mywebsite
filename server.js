const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon')

const server = express();

server.use(function (req, res, next) {
    if (req.secure)
        return next();

    const target = new URL();
    target.protocol = 'https';
    target.hostname = req.headers.host;
    target.pathname = req.url;

    res.redirect(target.toString());
});
server.use(helmet());
server.use(logger(':date[iso] :remote-addr'));
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use("/static", express.static(path.join(__dirname, "client", "build", "static")))
server.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')))
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = server;
