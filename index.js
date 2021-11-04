#!/usr/bin/env node
const version = require('./package').version;                 // 版本号
/* = package import
-------------------------------------------------------------- */
const program = require('commander');                         // 命令行解析
/* = task events
-------------------------------------------------------------- */
const createProject = require('./src/create-project'); // 创建项目
const generate = require('./src/generate'); // 创建
const config = require('./config'); // 创建
/* = set version
-------------------------------------------------------------- */
// 设置项目名和版本号
program.name("vtx").version(version, '-v, --version');

/* = deal receive command
-------------------------------------------------------------- */
// 创建项目
program
  .command("create <project-name>")
  .description("Create a new Vue project with Typescript", {
    name: 'The name of your new project (e.g. myApp, "My App")'
  })
  .action((name, options) => createProject(name));

// 快速生成模版 页面/组件
program
  .command("generate <type> <name>")
  .alias('g')
  .description("创建页面或组件", {
    type: Object.keys(config.modules).join(','),
    name: '组件名称包含组件路径。在src下指定的目录，不指定时则在项目src/pages目录下创建页面或src/components目录下创建组件，或者执行命令目录路径下创建页面或组件。'
  })
  .option("-e,--export", "导出模块至index.ts")
  .option("-r,--router <router>", "是否导出路由，仅page时可用")
  .action((type, name, options) => generate(type, name, options));
/* = main entrance
-------------------------------------------------------------- */
program.parse(process.argv);
