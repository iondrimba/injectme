'use-strict'
// node >  rename-me file version outputpath index.html
// demo > node rename-me src/app.js 1.1.1 public/js public/index.html
// output > public/app.1.1.1.js
var fs = require('fs');

var injectMe = function(options) {
    try {
        var cssContent = getContentFromFile(options.cssPath),
            jsContent = getContentFromFile(options.jsPath),
            indexContent = getContentFromFile(options.indexFile);


        indexContent = injectContentCss(cssContent, indexContent);
        indexContent = injectContentJs(jsContent, indexContent);

        saveIndexFile(indexContent, options.indexFile);

    } catch (ex) {
        throw new Error('error: ' + ex.message);
    }

    function getContentFromFile(filePath) {
        var content = '';
        if (filePath) {
            content = fs.readFileSync(filePath, 'utf8');
        }
        return content;
    }

    function removeSpaces(content) {
        content = content.replace(/\s/gm, '');
        return content;
    }

    function injectContentCss(content, indexContent) {

        if (content.length) {
            content = removeSpaces(content);
            indexContent = indexContent.replace(/\<\/head\>/igm, '<style>' + content + '</style>\n\<\/head\>');
        }

        return indexContent;
    }

    function injectContentJs(content, indexContent) {
        if (content.length) {
            indexContent = indexContent.replace(/\<\/body\>/igm, '<script>' + content + '</script>\n\<\/body\>');
        }
        return indexContent;
    }

    function saveIndexFile(content, indexFile) {
        fs.writeFileSync(indexFile, content, 'utf8');
    }
}

module.exports = injectMe
