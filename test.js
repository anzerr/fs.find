
const find = require('./index');

find('./', {
    filter: (path) => true,
    callback: (path, isDirectory) => {
        console.log(path, isDirectory);
    },
    max: 2
});