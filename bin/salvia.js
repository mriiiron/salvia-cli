#!/usr/bin/env node

let program = require('commander');

program
    .version('0.1.0')
    .command('init', 'Initialize a Salvia blog')
    .command('build', 'Build metadata for Salvia posts (salvia.posts.json)')
    .parse(process.argv);
