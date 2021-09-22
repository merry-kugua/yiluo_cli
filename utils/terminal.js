const {spawn} = require('child_process');

// ...args 表示将传过来的参数进行解构
const commandSpawn = (...args) => {
    // 使用promise回调
    return new Promise((resolve, reject) => {

        const childProcess = spawn(...args);

        childProcess.stdout.pipe(process.stdout, (res => {
            console.log(res)
        }));
        // 错误stderr
        childProcess.stderr.pipe(process.stderr,(err => {
            console.log(err)
        }));

        childProcess.on('close', () => {
            resolve();
        })
    })
    // childProcess 会有很多进程中的打印信息
    // 但是在过程中用户可以看到进程的安装信息
  
}
module.exports = {
    commandSpawn
}