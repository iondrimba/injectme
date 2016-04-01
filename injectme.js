'use-strict'

var fs = require('fs');

var injectMe = function(options) {
    try {
        var cssContent = getContentFromFile(options.cssPath),
            jsContent = getContentFromFile(options.jsPath),
            indexContent = getContentFromFile(options.indexFile);

        indexContent = injectContentCss(cssContent, indexContent);
        indexContent = injectContentJs(jsContent, indexContent);

        saveIndexFile(indexContent, options.indexFile);

        return indexContent;

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

    function cleanDuplicated(input, content) {
        var mergedContent = content.replace(input, '');
        return mergedContent;
    }

    function injectContentCss(content, indexContent) {
        var styleinline = '<style>' + content + '</style>';
        if (content.length) {
            indexContent = cleanDuplicated(styleinline, indexContent);
            indexContent = indexContent.replace(/\<\/head\>/igm, styleinline + '</head>');
        }
        return indexContent;
    }

    function injectContentJs(content, indexContent) {
        var scriptinline = '<script>' + content + '</script>';

        if (content.length) {
            indexContent = cleanDuplicated(scriptinline, indexContent);
            indexContent = indexContent.replace(/\<\/body\>/igm, scriptinline + '</body>');
        }
        return indexContent;
    }

    function saveIndexFile(content, indexFile) {
        fs.writeFileSync(indexFile, content, 'utf8');
    }
}

module.exports = injectMe
