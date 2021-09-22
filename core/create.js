const program = require('commander')

// 封装actions 
const { createProjectActionn, addAction, addPageAndRouterAction, addStoreAction} = require('./actions')
const creatCommands = () => {
    program.command('create <project> [others...]')
    .description('clone github repository')
    .action(createProjectActionn)

    program.command('add <name>')
    .description('add vue component, 例如 yiluo add HelloWord [-d src/components]')
    .action((name) => {
        addAction(name, program.dest || 'src/components' )
    })
    program.command('addpage <page>')
    .description('add vue page and router config, 例如 yiluo addpage Home [-d src/pages]')
    .action((page) => {
        addPageAndRouterAction(page, program.dest || 'src/pages' )
    })
    program.command('addstore  <store>')
    .description('add vue store config, 例如 yiluo addpage Home [-d src/pages]')
    .action((store) => {
        addStoreAction(store, program.dest || 'src/store')
    })
}
module.exports = creatCommands