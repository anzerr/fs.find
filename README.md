
### `Intro`
List all folder and files from a entrypoint

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.find.git
```

### `Example`
``` javascript

const find = require('fs.find');

find('./', {
    filter: (path) => true,  // filter folder that should not be gone down
    callback: (path, isDirectory) => {
        console.log(path, isDirectory);
    },
    max: 2
}).then(() => {
    console.log('done');
});

```