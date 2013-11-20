'use strict';

var Survey = require('diaochapai').Survey;

var middleware = function (config) {
    var survey = new Survey({
        appid: config.appid,
        secret: config.secret,
        survey: config.survey
    });

    var idAttr = config.idAttr || 'uid';

    return function (req, res, next) {
        var uid = req[idAttr];

        // callback from diaochapai, it will take some parameters, like `sign` and `response`
        if (req.query.sign) {
            var valid = survey.checkSign(req.query);

            if (!valid) {
                next(new Error('Invalid diaochapai callback signature'));
                return;
            }

            req.surveyResult = req.query.response;

            next();
            return;
        }

        survey.exists(uid, function (err, response, body) {
            if (err) {
                next(err);
                return;
            }

            if (response.statusCode >= 400) {
                next(new Error(body));
                return;
            }

            var result = null;

            try {
                result = JSON.parse(body);
            } catch (e) {
                next(e);
                return;
            }

            if (result.response) {
                next();
                return;
            }

            var options = {
                'return_url': config.returnUrl || (req.protocol + '://' + req.get('host') + req.url)
            };

            if (config.expire) {
                options.expire = options.expire;
            }

            var surveyUrl = survey.getUrl(uid, options);

            res.redirect(surveyUrl);
        });
    };
};

module.exports = middleware;
