#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parsePostFile(postsDir, postFileName, result) {
    let postKey = postFileName.replace(/\..*$/g, '');
    let postContent = fs.readFileSync(path.join(postsDir, postFileName), 'utf8');
    if (!postContent.startsWith('```')) {
        return false;
    }
    let metaEndIndex = postContent.indexOf('```', 3);
    let metaContent = postContent.substring(3, metaEndIndex).trim().replace(/\r\n/g, '\n');
    let post = {
        key: postKey,
        title: null,
        author: null,
        date: null,
        category: null,
        tags: []
    };
    let metaCollection = metaContent.split('\n');
    for (let j = 0; j < metaCollection.length; j++) {
        let metaItem = metaCollection[j];
        let colonIndex = metaItem.indexOf(':');
        if (colonIndex == -1) {
            return false;
        }
        let metaKey = metaItem.substring(0, colonIndex).trim();
        let metaValue = metaItem.substring(colonIndex + 1).trim();
        switch (metaKey) {
            case 'title':
                post.title = metaValue;
                break;
            case 'author':
                post.author = metaValue;
                break;
            case 'date':
                post.date = (new Date(metaValue)).toJSON();
                break;
            case 'category':
                post.category = metaValue;
                if (!result.categories.includes(metaValue)) { result.categories.push(metaValue); }
                break;
            case 'tags':
                let tags = metaValue.split(',');
                for (let k = 0; k < tags.length; k++) {
                    let tag = tags[k].trim();
                    post.tags.push(tag);
                    if (!result.tags.includes(tag)) { result.tags.push(tag); }
                }
                break;
            default:
                return false;
        };
    }
    result.posts.push(post);
    return true;
}


exports.build = function (dir) {

    let result = {
        posts: [],
        tags: [],
        categories: []
    };

    let baseDir = (dir ? path.join('.', dir) : '.');
    let postsDir = path.join(baseDir, 'posts');

    try {
        let pass = fs.statSync(path.join(baseDir, 'salvia.blog.json')).isFile() && fs.statSync(postsDir).isDirectory();
    }
    catch (e) {
        console.error('Salvia ERROR: Current path is not a valid Salvia site.');
        process.exit(1);
    }

    let postFiles = fs.readdirSync(postsDir);
    let countProcessed = 0;

    for (let i = 0; i < postFiles.length; i++) {
        let isPparsed = parsePostFile(postsDir, postFiles[i], result);
        if (isPparsed) {
            countProcessed++;
        }
        else {
            console.warn('Salvia WARNING: Metadata of "' + postFiles[i] + '" is missing or invalid.');
        }
    }

    console.log('Salvia: Done. ' + countProcessed + ' post(s) processed.');

    fs.writeFileSync(path.join(baseDir, 'salvia.posts.json'), JSON.stringify(result));

};
