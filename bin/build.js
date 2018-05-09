#!/usr/bin/env node

let fs = require('fs');


let result = {
    posts: [],
    tags: [],
    categories: []
};

let postFiles = fs.readdirSync('.');
for (let i = 0; i < postFiles.length; i++) {
    // console.log(posts[i]);

    let postContent = fs.readFileSync('./' + postFiles[i], 'utf8');
    // console.log(postContent);

    if (postContent.startsWith('```')) {
        let metaEndIndex = postContent.indexOf('```', 3);
        let metaContent = postContent.substring(3, metaEndIndex).trim().replace(/\r\n/g, '\n');
        // console.log(metaContent);

        let post = {
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
            // console.log(metaKey + ': ' + metaValue);

            switch (metaKey) {
                case 'title':

                    break;
                case 'author':

                    break;
                case 'date':

                    break;
                case 'category':

                    break;
                case 'tags':

                    break;
                default:
                    // ERROR
                    break;
            };

        }

    }


}
