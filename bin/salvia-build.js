#!/usr/bin/env node

let fs = require('fs');

let result = {
    posts: [],
    tags: [],
    categories: []
};

let postFiles = fs.readdirSync('./posts/');

for (let i = 0; i < postFiles.length; i++) {
    let postKey = postFiles[i].replace(/\..*$/g, '');
    let postContent = fs.readFileSync('./posts/' + postFiles[i], 'utf8');
    if (postContent.startsWith('```')) {
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
                // ERROR
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
                    // ERROR
                    break;
            };
        }
        result.posts.push(post);
    }
}

fs.writeFileSync('./salvia.posts.json', JSON.stringify(result));