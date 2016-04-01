var injectMe = require('../injectme.js');
var fs = require('fs');
var del = require('del');

describe('InjectMe Tests', function() {

    it('InjectMe should be defined ', function() {
        expect(injectMe).toBeDefined();
    });

    it('Should inject CSS into html', function() {
        var result = false,
            options = {};

        options.cssPath = './public/css/app.css';
        options.indexFile = './public/index.html';

        var injectedHtml = injectMe(options);
        var htmlContent = fs.readFileSync(options.indexFile, 'utf8');

        expect(injectedHtml).toBe(htmlContent);
    });

    it('Should inject JS into html', function() {
        var result = false,
            options = {};

        options.jsPath = './public/js/app.js';
        options.indexFile = './public/index.html';

        var injectedHtml = injectMe(options);
        var htmlContent = fs.readFileSync(options.indexFile, 'utf8');

        expect(injectedHtml).toBe(htmlContent);
    });

    it('Should throw exception', function() {
        expect(function() {
            var result = false;
            var options = {};

            injectMe(options);

        }).toThrow();
    });

    it('Should inject CSS and JS into html', function() {
        var resultCSS = false,
            resultJS = false,
            options = {};

        options.cssPath = './public/css/app.css';
        options.jsPath = './public/js/app.js';
        options.indexFile = './public/index.html';

        var injectedHtml = injectMe(options);
        var htmlContent = fs.readFileSync(options.indexFile, 'utf8');

        expect(injectedHtml).toBe(htmlContent);
    });

});
