## injectme

Inject CSS and JS inside your html

[![Build Status](https://travis-ci.org/iondrimba/injectme.svg?branch=master)](https://travis-ci.org/iondrimba/injectme) [![Build status](https://ci.appveyor.com/api/projects/status/mkn7bgjjv2een6lc?svg=true)](https://ci.appveyor.com/project/iondrimba/injectme) [![Coverage Status](https://coveralls.io/repos/github/iondrimba/injectme/badge.svg?branch=master)](https://coveralls.io/github/iondrimba/injectme?branch=master)


#### GOAL

1. Avoid render blocking files
2. Optimize critical path / above the fold CSS
3. Optimize loading

#### INSTALL

```sh
 npm install injectme -g
```

#### TODO

* Develop a Gulp plugin for easy integration
* Write more tests

#### Target Project

* This package is meant to be used with Single Page Applications

#### Terminal

Inside the terminal type:

```sh
injectme public/css/app.js public/index.html
```

#### Multiple files

* multiple parameters are passed inside quotes and comma separeted 'param1', 'param2'

```sh
injectme 'public/js/app.js','public/css/app.css' public/index.html
```

#### Using with Gulp (workaround)

Install injectme

```sh
npm install injectme -g
```

Inside your gulpfile load injectme

```js
var renameMe = require('injectme');
```

Finally you should run the rename task manually as the last task, do not chain it with other tasks.

```sh
gulp bump-patch
```
