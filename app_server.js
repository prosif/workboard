const https = require("https");
const http = require("http");
const fs = require('fs');
const path = require('path');
const config = require('./config');

const PATH_MAP = {
    "/workboard": {
        path: "web/index.html",
        contentType: "text/html"
    },
    "/workboard/app.js": {
        path: "src/app.js",
        contentType: "text/javascript"
    }
};

const options = {
    key: fs.readFileSync(config.SSL_KEY_PATH),
    cert: fs.readFileSync(config.SSL_CERT_PATH)
};

https.createServer(options, (req, res) => {
    let requestPath = req.url;

    const queryParamIndex = requestPath.indexOf("?");

    if (queryParamIndex > 0) {
        requestPath = requestPath.substring(0, queryParamIndex);
    }

    const pathMapping = PATH_MAP[requestPath];

    if (pathMapping) {
        res.statusCode = 200;
        res.setHeader("Content-Type", pathMapping.contentType);
        const payload = fs.readFileSync(path.join(__dirname, pathMapping.path));
        res.end(payload);
    } else {
        res.statusCode = 404;
        res.end();
    }
}).listen(443);

