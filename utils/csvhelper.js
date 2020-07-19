let fs = require('fs');
let iconv = require('iconv-lite');
let unzip = require('unzip');

let csv = {};

/**
 * 解析csv文件 返回一个对象的数组
 * promise async/await
 * @param file csv文件
 * @constructor
 */
csv.Parse = function (file) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file, {encoding: 'binary'});
        let data = '';
        let result = [];
        let column;
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('data', (chunk) => {
            data += chunk;
        });
        stream.on('end', () => {
            const buf = Buffer.from(data, 'binary');
            const str = iconv.decode(buf, 'GBK'); // node不支持GBK
            let strArr = str.split('\r\n');
            // 组装对象
            for (let i = 0; i < strArr.length - 1; i++) {
                if (i === 0) { // csv第一列作为对象的key
                    column = strArr[i].split(',');
                    continue;
                }
                let objTmp = {};
                for (let j = 0; j < column.length; j++) {
                    let arrTmp = strArr[i].split(',');
                    objTmp[column[j]] = arrTmp[j];

                }
                result.push(objTmp);
            }
            resolve(result);
        });
    });
};

/**
 * 解压zip文件 返回全路径+文件名
 * promise async/await
 * @param file zip文件
 * @param path zip文件解压的路径
 * @constructor
 */
csv.Unzip = function (file, path) {
    return new Promise((resolve, reject) => {
        try {
            let tmp = fs.createReadStream(file).pipe(unzip.Extract({path: path}));
            tmp.on('close', function () {
                let filePath = tmp._opts.path + '/' + fs.readdirSync(tmp._opts.path)[0];
                resolve(filePath);
            });
        } catch (e) {
            reject(e);
        }

    });
};

module.exports = csv;