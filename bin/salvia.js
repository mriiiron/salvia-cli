#!/usr/bin/env node

const initializer = require('./salvia-init');
const builder = require('./salvia-build');

function helpAndExit() {
    console.log();
    console.log('  Usage: salvia <command>');
    console.log();
    console.log('  Commands:');
    console.log();
    console.log('    init <folder>    Initialize Salvia blog in a new folder.');
    console.log('                     Must provide a valid folder name.');
    console.log('    build [folder]   Build posts metadata for existing Salvia blog inside an existing folder.');
    console.log('                     If folder name is omitted, then build in current folder.');
    process.exit(1);
}

if (process.argv[2]) {
    switch (process.argv[2]) {
        case 'init':
            if (process.argv[3]) {
                initializer.init(process.argv[3]);
            }
            else {
                helpAndExit();
            }
            break;
        case 'build':
            if (process.argv[3]) {
                builder.build(process.argv[3]);
            }
            else {
                builder.build();
            }
            break;
        default:
            helpAndExit();
    }
}
else {
    helpAndExit();
}
