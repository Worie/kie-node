'use strict';

const Archiver = require('archiver');
const url = require('url');
const request = require('request');

const isImage = (input) => {
    const extensionArray = [
        'jpg',
        'png',
        'svg',
        'gif'
    ];

    const regexp = extensionArray
                  .map(el => '\\.'+el)
                  .join('|');

    return new RegExp(regexp)
                  .test(input);
}

const packer = (req, res) => {
    const zip = Archiver('zip');
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': `attachment; filename=${req.body.zipName}.zip`
    });

    // Send the file to the page output.
    zip.pipe(res);

    // Zip virtual files (that can be modyfied by user)
    req.body.data.forEach(file => {
        zip.append(file.contents, { name: file.fileName });
    });

    // Download needed images
    req.body.images.forEach(file => {
        const uri = url.resolve(req.body.sourceUrl, file.replace(/^\//,''));

        if (isImage(file)) {
            zip.append(request.get({
                uri: uri,
                setEncoding: null
            }), {
                name: file
            });
        }
    });

    zip.finalize();
};

module.exports = {
    packer,
};
