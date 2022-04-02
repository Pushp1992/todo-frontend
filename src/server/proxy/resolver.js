const proxy = require('express-http-proxy');
const hosts = require('../config');

function selectProxyHost(req) {
    const hostname = req.headers.server;
    if (hosts[hostname]) {
        // intentional use of console to print the hostname
        console.log('Host: ', hosts[hostName] + req.url);
        return hosts[hostName];
    }

    console.error(`Unable to Loacate your host: ${hostName}, please set the host in config files`);
    return req.hostName;
};

module.exports = proxy(selectProxyHost, {
    memoizeHost: true
});