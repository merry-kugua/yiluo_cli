#!/usr/bin/env node
const program = require('commander');
const helpOptions = require('./core/help');
const createCommands = require('./core/create');
// 查看当前的版本号
program.version(require('./package.json').version);
// 调用helpOption函数查看帮助信息
helpOptions();
// 创建其他指令
createCommands();
program.parse(process.argv);