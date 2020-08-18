
const fs = require('fs.promisify'),
    promise = require('promise.util'),
    is = require('type.util'),
    path = require('path');

class Find {

    constructor(option = {}) {
        this.option = option;
        if (!is.function(this.option.callback)) {
            throw new Error('callback should be a function');
        }
        if (this.option.filter && !is.function(this.option.filter)) {
            throw new Error('filter should be a function');
        }
    }

    async eachDir(dir) {
        const list = await fs.readdir(dir);
        if (this.option.max) {
            return promise.each(list, (r) => this.find(path.join(dir, r)), this.option.max);
        }

        const wait = [];
        for (let i in list) {
            wait.push(this.find(path.join(dir, list[i])));
        }
        return Promise.all(wait);
    }

    find(dir) {
        return fs.access(dir).then(async () => {
            let res = null;
            try {
                res = await fs.stat(dir);
            } catch(e) {
                return;
            }
            if (res && res.isDirectory()) {
                const valid = this.option.filter? await this.option.filter(dir) : true;
                if (valid) {
                    await this.eachDir(dir);
                    return this.option.callback(dir, true);
                };
                return null;
            }
            return this.option.callback(dir, false);
        });
    }

}

const find = (dir, option = {}) => {
    return (new Find(option)).find(dir);
}

module.exports = find;
module.exports.default = find;