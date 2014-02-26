'use strict';

var test = require('tape'),
    anvil = require('../lib'),
    crypto = require('crypto');

test('anvil', function (t) {

    t.test('api', function (t) {
        t.plan(1);

        t.equal(typeof anvil, 'function', 'anvil is a function.');
    });

    t.test('runtime', function (t) {

        anvil('md5 hash', function (forge, hammer) {

            forge.before(function (next) {
                t.pass('suite before called.');
                next();
            });

            forge.after(function (error, results) {
                t.ok(!error, 'no error.');
                t.ok(results.length, 'results.');
                t.pass('suite before called.');
                t.end();
            });

            forge.beforeEach(function (next) {
                t.pass('suite beforeEach called.');
                next();
            });

            forge.afterEach(function (next) {
                t.pass('suite afterEach called.');
                next();
            });

            forge.add('md5', function () {
                crypto.createHash('md5').update('hello world').digest('hex');
            });

            hammer();
        });

    });

});