var injectMe = require('../injectme.js');
var fs = require('fs');
var del = require('del');

describe('InjectMe Tests', function() {
    function clearHtml() {
        var indexFile = './public/index.html';
        var content = fs.readFileSync(indexFile, 'utf8');
        //remove injected script
        content = content.replace(/\<script\>(.+)|(.+\n*)?\<\/script\>/igm, '');
        //remove injected style
        content = content.replace(/\<style\>(.+)|(.+\n*)?\<\/style\>/igm, '');
        //remove blank lines from head
        content = content.replace(/\>\n+?\<\/head\>/igm, '>\n</head>');
        //remove blank lines from body
        content = content.replace(/\>\n+?\<\/body\>/igm, '>\n</body>');

        fs.writeFileSync(indexFile, content, 'utf8');
    };
    afterEach(function() {
        clearHtml();
    });

    it('InjectMe should be defined ', function() {
        expect(injectMe).toBeDefined();
    });

    it('Should inject CSS into html', function() {
        var result = false,
            options = {};

        options.cssPath = './public/css/app.css';
        options.indexFile = './public/index.html';
        injectMe(options);

        var content = fs.readFileSync(options.indexFile, 'utf8');
        result = (content.match(/\<style\>.+\<\/style\>/gm) !== null);
        expect(result).toBe(true);
    });

    it('Should inject JS into html', function() {
        var result = false,
            options = {};

        options.jsPath = './public/js/app.js';
        options.indexFile = './public/index.html';
        injectMe(options);

        var content = fs.readFileSync(options.indexFile, 'utf8');
        result = (content.match(/\<script\>.+\<\/script\>/gm) !== null);
        expect(result).toBe(true);
    });

    it('Should inject CSS and JS into html', function() {
        var resultCSS = false,
            resultJS = false,
            options = {};

        options.cssPath = './public/css/app.css';
        options.jsPath = './public/js/app.js';
        options.indexFile = './public/index.html';
        injectMe(options);

        var content = fs.readFileSync(options.indexFile, 'utf8');
        resultCSS = (content.match(/\<style\>.+\<\/style\>(\n)?\<\/head\>/gm) !== null);
        resultJS = (content.match(/\<script\>(.+)|(.+\n*)?\<\/script\>(\n)\<\/body\>/igm) !== null);

        expect(resultCSS).toBe(true);
        expect(resultJS).toBe(true);
    });

});
