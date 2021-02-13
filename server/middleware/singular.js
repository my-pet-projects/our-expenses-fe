/*
 * This middleware is a workaround to force json-server to return a single json object from certain urls.
 * Simply append "singular=1" parameter to the query string.
 * https://github.com/typicode/json-server/issues/541#issuecomment-307300368
 */

'use strict';

module.exports = (req, res, next) => {
    const _send = res.send;
    res.send = function (body) {
        if (require('url').parse(req.originalUrl, true).query['singular'] && req.method === 'GET') {
            try {
                const json = JSON.parse(body);
                if (Array.isArray(json)) {
                    if (json.length === 1) {
                        return _send.call(this, JSON.stringify(json[0]));
                    } else if (json.length === 0) {
                        return _send.call(this, '{}', 404);
                    }
                }
            } catch (e) {
                console.error('failed to execute singular middleware.');
            }
        }
        return _send.call(this, body);
    };
    next();
};
