'use strict';

var async = require('async'),
    hammer = require('hammertime');

exports = module.exports = function anvil(description, fn) {
    var before, beforeEach, after, afterEach, series;
    series = [];

    before = function (next) {
        next();
    };

    afterEach = function (next) {
        next();
    };

    var forge = {
        description: description,
        
        before: function (fn) {
            before = fn;
            return this;
        },

        after: function (fn) {
            after = fn;
            return this;
        },

        beforeEach: function (fn) {
            beforeEach = fn;
            return this;
        },

        afterEach: function (fn) {
            afterEach = fn;
            return this;
        },

        add: function (name, fn) {
            series.push(function (next) {
                hammer({
                    before: beforeEach,
                    after: function (results) {
                        results.name = name;

                        afterEach(function (error) {
                            next.call(null, error, results);
                        });
                    }
                })
                .time(fn);
            });
        }
    };

    fn.call(null, forge, function () {
        before(function (error) {
            if (!error) {
                async.series(series, function (error, results) {
                    if (after) {
                        after.apply(null, arguments);
                    }
                });
            }
        });
    });
};