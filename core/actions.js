// 讲回调函数转化为promise
const { promisify } = require('util');
const path = require('path')

const download = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/reopConfig');
const { commandSpawn } = require('../utils/terminal');
const { compile, writetoFile, createDirSync} = require('../utils/utils');
// callback => promisify => 转成promise函数 async -await 
const createProjectActionn = async (project) => {
    // clone github项目
    await download(vueRepo, project, { clone: true })
    // 执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(`c${command}`, ['install'], {cwd: `./${project}`})
    // 打开浏览器 先执行打开浏览器
     open("http://localhost:8080/")
    // 运行npm run server 
    await commandSpawn (command, ['run', 'serve'], {cwd: `./${project}`})
}
const addAction = async (name, dest) => {
    // 编译ejs模板
    const result = await compile("vue-component.ejs",{name, lowerName: name.toLowerCase()})
    // 写入文件操作 template route 和store 
    const targetPath = path.resolve(dest, `${name}.vue`)
    console.log(targetPath)
    // // 写入路径
    writetoFile(targetPath, result)

}
const addPageAndRouterAction = async (name, dest) => {
    // 编译路由and pages ejs模板
    const data = {name, lowerName: name.toLowerCase()}
    const pageResult = await compile("vue-component.ejs", data)
    const routerResult = await compile("vue-router.ejs", data)

    // 写入路径
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
        const targetPagePath = path.resolve(dest,  `${name}.vue`);
        const targetRoutePath = path.resolve(dest, 'router.js')
        // 写入文件
        writetoFile(targetPagePath, pageResult);
        writetoFile(targetRoutePath, routerResult)
    }
   
}
const addStoreAction = async (name, dest) => {
    const storeResult = await compile("vue-store.ejs", {});
    const typesResult = await compile("vue-types.ejs", {});
    // 创建文件 
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
        const targetPagePath = path.resolve(dest,  `${name}.vue`);
        const targetRoutePath = path.resolve(dest, 'router.js')
        // 写入文件
        console.log(targetPagePath, storeResult, )
        writetoFile(targetPagePath, storeResult);
        writetoFile(targetRoutePath, typesResult)
    }
}
module.exports = {
    createProjectActionn,
    addAction,
    addPageAndRouterAction,
    addStoreAction
}