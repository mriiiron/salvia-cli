#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const builder = require('./salvia-build');

exports.init = function (dir) {

    console.log('Salvia: Initializing ' + dir + ' ...');

    try {
        if (fs.statSync('./' + dir).isDirectory()) {
            console.error('Salvia ERROR: Target directory "' + dir + '" exists.');
            process.exit(1);
        }
    }
    catch (e) {
        if (/^[a-zA-Z0-9_\-]*$/.test(dir)) {
            fs.mkdirSync(dir);
        }
        else {
            console.error('Salvia ERROR: Directory name can only include letters, numbers, hyphens (-) and underscores (_).');
        }
    }

    try {
        copydir.sync(path.join(__dirname, '../assets'), path.join('.', dir));
        builder.build(dir);
    }
    catch (e) {
        console.error('Salvia ERROR: Failed to initialize blog. Details:');
        console.error(e.message);
    }

    console.log('Salvia: Your new blog is ready. Enjoy :)');

}
