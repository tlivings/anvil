[![Build Status](https://travis-ci.org/tlivings/anvil.png)](https://travis-ci.org/tlivings/anvil) [![NPM version](https://badge.fury.io/js/anvil.png)](http://badge.fury.io/js/anvil)

# Anvil

A lightweight bench-suite module for [hammertime](https://github.com/tlivings/hammertime).

# Usage

```javascript
var anvil = require('anvil');

anvil('sword vs spear', function (forge, hammer) {
    forge.after(function (error, results) {
        results.forEach(function (report) {
            console.log('%s: %d operations/second.', report.name, report.ops);
        });
    });

    forge.add('sword', function () {
        ...
    });

    forge.add('spear', function () {
        ...
    });

    hammer();
});
```

### Async

Just pass a callback to do async.

```javascript
forge.add('spear', function (next) {
    ...
    next();
});
```

# API

`anvil` takes a description and invokes the supplied callback with a `forge` and a `hammer`.

### forge

* `before` - function to call as a suite setup. Receives `next` callback.
* `after` - function to call as a suite tear-down / report analysis. Receives `error` and `results`.
* `beforeEach` - called before each suite item runs. Receives `next` callback, which can accept an `error` argument.
* `afterEach` - called after each suite item runs. Receives `next` callback, which can accept an `error` argument.

Begin by calling `hammer`.