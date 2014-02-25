'use strict';

var test = require('tape'),
    anvil = require('../lib');

test('anvil', function (t) {

    t.test('api', function (t) {
        t.plan(1);

        t.equal(typeof anvil, 'function', 'anvil is a function.');
    });

    t.test('create', function (t) {

        anvil('operation1 and operation2', function (forge, hammer) {

            forge.before(function (next) {
                t.pass('suite before called.');
                next();
            });

            forge.after(function (error, results) {
                t.ok(!error, 'no error.');
                t.equal(results.length, 2, '2 reports in results.');
                t.pass('suite before called.');
                results.forEach(function (report) {
                    console.log('%s: %d operations/second.', report.name, report.ops);
                });
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

            forge.add('operation1', function () {

            });

            forge.add('operation2', function () {

            });

            hammer();
        });

    });

});