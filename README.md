
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/fs.find/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/fs.find/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/fs.find/workflows/test/badge.svg)

List all folder and files from a entrypoint

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.find.git
npm install --save @anzerr/fs.find
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