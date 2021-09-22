const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const compile = (templateName, data) => {
    const templatePostion = `../templates/${templateName}`;
    // 绝对路径进行拼接
    const templatePath = path.resolve(__dirname, templatePostion);
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, {}, (err, result) => {
            if (err) {
                console.log(err)
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}
// 判断路径是否存在，不存在进行创建
const createDirSync = (pathName) => {
    if (fs.existsSync(pathName)) {
        return true;
    } else {
        if (createDirSync(path.dirname(pathName))) {
            fs.mkdirSync(pathName)
            return true;
        }
    }
}
const writetoFile  = (path, content) => {
    // 判断当前路径是否存在 
    // if (createDirSync(path)) {
     return fs.promises.writeFile(path, content);
    // }
}
module.exports = {
    compile,
    writetoFile,
    createDirSync
}