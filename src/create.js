const path = require('path');                         // 路径模块
const Log = require("./utils/log");                       // 控制台输出
const Util = require('./utils/file');                      // 工具函数
const Colors = require('./utils/colors');
const Config = require('../config');                    // 获取配置项

async function createProject(projectName, type) {
  // 模版文件路径
  let templateRoot = path.join(Config.template, `/${type}`);
  // 业务文件夹路径
  let page_root = path.join(Config.entry, projectName);
  // 查看文件夹是否存在
  let isExists = await Util.checkFileIsExists(page_root);
  if (isExists) {
    Log.error(`project ${page_root} 目录已存在`);
    return;
  }


  // 创建文件夹
  Log.success(`Preparing directory ./${projectName}`);
  await Util.createDir(page_root);
  // 复制文件
  Util.copyFolder(templateRoot, page_root, function () {
    Log.success(`Downloading and extracting project with ${type} vue-typescript-template`)
    console.log(`> ${Colors.input('npm install')}`);
  })

  const { spawn } = require('child_process');
  projectPath = path.resolve(process.cwd(), page_root);
  const npm = spawn('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });

  npm.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
  npm.on('close', (code) => {
    if (!code) {
      console.log(`> ${Colors.input('npm rebuild node-sass --save-dev')}`);
      const rebuild = spawn('npm', ['rebuild', 'node-sass', '--save-dev'], { cwd: projectPath, stdio: 'inherit' });
      rebuild.on('error', (err) => {
        console.error(err);
        process.exit(1);
      });
      rebuild.on('close', (code) => {
        console.log(`\n${Colors.strong(`Your vue typescript app is ready! Follow these next steps:`)}\n
          - Go to your new project: ${Colors.input(`cd ./${projectName}`)}
          - Run ${Colors.input(`npm run serve`)} within the app directory to see your app in the browser
          - Run ${Colors.input(`npm rebuild node-sass --save-dev`)} within the app directory if rebuild node-sass fail
          - Run ${Colors.input(`vtx -h`)} within the app directory to see vtx commond usage
          - Generate your app page,component,modal using ${Colors.input(`vtx generate <type> <name> <options>`)} 
          ${Colors.strong(`https://github.com/442623641/vue-ts-toolkit`)}`);
      })
    }
  });
}

// Main
module.exports = async function (name, template) {
  const choices = [
    `${Colors.input(`sidemenu`)}  | A creating project with a side menu with navigation in the content area`,
    `${Colors.input(`tabs`)}      | A creating project with a simple with navigation in the top navbar`,
    `${Colors.input(`mixins`)}    | A creating project with both side menu and top navbar with navigation`
  ]
  const templates = ['sidemenu', 'tabs', 'mixins'];
  if (!templates.includes(template)) {
    const Prompt = require("inquirer");
    const initQuestions = [{
      type: 'list',
      name: 'type',
      message: `Create template: (Use arrow keys):`,
      choices
    }]
    template = await Prompt.prompt(initQuestions)
    template = templates.find(v => template.type.includes(v))
    if (!template) return;
  }
  createProject(name, template);
};
