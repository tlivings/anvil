# Anvil

A lightweight bench-suite module for [hammertime](http://github.com/tlivings/hammertime).

# Usage

```javascript
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