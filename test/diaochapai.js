/*global describe, it*/

'use strict';

var assert = require('chai').assert;
var diaochapai = require('../');

describe('express-diaochapai', function () {
    it('should return a middleware', function () {
        var middleware = diaochapai({
            appid: 123,
            secret: 456,
            survey: 789
        });

        assert.isFunction(middleware);

        assert.equal(middleware.length, 3, 'middleware accept 3 arguments');
    });

    it('should redirect to diaochapai if user not answered the survey');

    it('should parse callback params when user finished the survey');

    it('should raise error if appid not valid', function () {
        var middleware = diaochapai({
            appid: 123,
            secret: 456,
            survey: 789
        });

        middleware({
            uid: 1,
            query: {},
            url: '/abc',
            get: function () {
                return 'a.b.c';
            }
        }, {}, function (err) {
            assert.ok(err, 'invalid appid');
        });
    });
});
