const fs = require('fs');                           // 文件读取模块
const path = require('path');                         // 路径模块const
const shell = require('shelljs');
const Log = require("./log");
module.exports = {
    // 查看文件/文件夹是否存在
    checkFileIsExists(path) {
        return fs.existsSync(path);
    },
    // 创建文件夹
    createDir(src) {
        return new Promise(resolve => {
            fs.mkdir(src, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
                return resolve();
            });
        });
    },
    // 获取文件夹下的list
    readDir(path) {
        return new Promise(resolve => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    throw err;
                }
                return resolve(files);
            })
        });
    },
    // 复制文件
    copyFile(originPath, curPath) {
        return new Promise(resolve => {
            fs.copyFile(originPath, curPath, fs.constants.COPYFILE_EXCL, (err) => {
                if (err) {
                    throw err;
                }
                return resolve('copyFile success!!!');
            });
        });
    },
    // 复制批量文件
    copyFilesArr(originPath, curPath, arr) {
        return new Promise(async resolve => {
            let extName = '';
            for (let i = 0; i <= arr.length - 1; i++) {
                extName = path.extname(arr[i]);
                await this.copyFile(`${originPath}/${arr[i]}`, curPath + extName);
            }
            return resolve('copyFilesArr success!!!');
        });
    },
    copyFolderFile(srcPath, tarPath, cb) {
        var rs = fs.createReadStream(srcPath)
        rs.on('error', function (err) {
            if (err) {
                console.log('read error', srcPath)
            }
            cb && cb(err)
        })

        var ws = fs.createWriteStream(tarPath)
        ws.on('error', function (err) {
            if (err) {
                console.log('write error', tarPath)
            }
            cb && cb(err)
        })
        ws.on('close', function (ex) {
            cb && cb(ex)
        })

        rs.pipe(ws)
    },
    // 复制文件夹
    copyFolder(srcDir, tarDir, cb) {
        fs.readdir(srcDir, (err, files) => {
            var count = 0
            var checkEnd = function () {
                ++count == files.length && cb && cb()
            }

            if (err) {
                checkEnd()
                return
            }

            files.forEach((file) => {
                var srcPath = path.join(srcDir, file)
                var tarPath = path.join(tarDir, file)

                fs.stat(srcPath, (err, stats) => {
                    if (stats.isDirectory()) {
                        fs.mkdir(tarPath, (err) => {
                            if (err) {
                                console.log(err)
                                return
                            }

                            this.copyFolder(srcPath, tarPath, checkEnd)
                        })
                    } else {
                        this.copyFolderFile(srcPath, tarPath, checkEnd)
                    }
                })
            })

            //为空时直接回调
            files.length === 0 && cb && cb()
        })
    },
    getCurrentDate() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date;
        return time;
    },
    // 替换文件中的内容
    fileStrReplace(filePath, files, tagerts) {
        return new Promise(async resolve => {
            for (let i = 0; i < files.length; i++) {
                let data = fs.readFileSync(`${filePath}/${files[i]}`, 'utf8');
                Object.keys(tagerts).forEach(key => {
                    data = data.replace(new RegExp(`\\$${key}\\$`, 'g'), tagerts[key]);
                })
                // 加上
                let extName = path.extname(files[i]);
                if (extName == '.ts') {
                    try {
                        let creator = shell.exec('git config user.name');
                        if (creator.stdout) {
                            let name = creator.stdout.replace(/[\r\n]/g, "");
                            let annotation = `// Created by ${name} on ${this.getCurrentDate()}`;
                            data = annotation + '\n' + data
                        }
                    } catch (error) { }
                }
                fs.writeFileSync(`${filePath}/${files[i]}`, data, 'utf8');
            }
            return resolve(files);
        });
    },
    writeFileSync(filePath, fileName, text, tagerts) {
        tagerts && Object.keys(tagerts).forEach(key => {
            text = text.replace(new RegExp(`\\$${key}\\$`, 'g'), tagerts[key]);
        })
        let file = path.join(filePath, fileName);
        return fs.appendFileSync(file, text);
    }
};
