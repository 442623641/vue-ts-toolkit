#!/usr/bin/env node
const version = require('./package').version;                 // 版本号
/* = package import
-------------------------------------------------------------- */
const program = require('commander');                         // 命令行解析
/* = task events
-------------------------------------------------------------- */
const createProject = require('./src/create'); // 创建项目
const generate = require('./src/generate'); // 创建
const config = require('./config'); // 创建
const Colors = require('./src/utils/colors');
/* = set version
-------------------------------------------------------------- */
// 设置项目名和版本号
program.name("vtx").version(version, '-v, --version');

program.addHelpText('after', `
${Colors.strong(`Examples call:`)}

 $ ${Colors.input(`vtx -h`)}
 $ ${Colors.input(`vtx generate -h`)} 
 $ ${Colors.input(`vtx create myApp`)} 
 $ ${Colors.input(`vtx generate page about`)}
 $ ${Colors.input(`vtx generate page contact -r`)}
 $ ${Colors.input(`vtx generate page contact --router=root`)}
 $ ${Colors.input(`vtx generate page pages/home/home-a --router=layout`)}
 $ ${Colors.input(`vtx generate component contact/form`)}
 $ ${Colors.input(`vtx generate directive ripple --export`)}
 $ ${Colors.input(`vtx generate directive ripple -e`)}
 $ ${Colors.input(`vtx generate service api/user`)}
 $ ${Colors.input(`vtx generate modal user`)}
 $ ${Colors.input(`vtx generate store user`)}
 $ ${Colors.input(`vtx generate/g interface user`)}
 $ ${Colors.input(`vtx generate/g class user`)}`)
/* = deal receive command
-------------------------------------------------------------- */
// 创建项目
program
  .command("create <project-name> [template-type]")
  .description("Create a new Vue project with Typescript", {
    name: 'The name of your new project (e.g. myApp, "My App")',
    type: `The template type of your new project  (tabs,sidemenu,mixins)`
  })
  .action((name, type, options) => createProject(name, type));

// 快速生成模版 页面/组件
program
  .command("generate <type> <name>")
  .alias('g')
  .description("创建页面或组件", {
    type: Object.keys(config.modules).join(','),
    name: '组件名称包含组件路径。在src下指定的目录，不指定时则在项目src/pages目录下创建页面或src/components目录下创建组件，或者执行命令目录路径下创建页面或组件。'
  })
  .option("-e,--export", "导出模块至index.ts")
  .option("-r,--router [router]", 'page router module (choices: "layout", "root",true,<default: "root">)', true)
  .action((type, name, options) => generate(type, name, options));

/* = main entrance
-------------------------------------------------------------- */
program.parse(process.argv);
