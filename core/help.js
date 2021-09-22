const program = require('commander')

const helpOptions = () => {
// 增加自己的options
program.option('-y --yiluo', 'Is a YiLuo cli')
program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
// 打印Author日志
program.on('--help', function () {
    console.log(' ')
    console.log('Author')
    console.log("   Author YiLuo")
})
}
module.exports = helpOptions