const path = require('path');                         // 路径模块
const Log = require("./utils/log");                       // 控制台输出
const Util = require('./utils/file');                      // 工具函数
let Config = require('../config');                    // 获取配置项

async function createProject(projectName) {
  // 模版文件路径
  let templateRoot = path.join(Config.template, '/project');
  // 业务文件夹路径
  let page_root = path.join(Config.entry, projectName);
  // 查看文件夹是否存在
  let isExists = await Util.checkFileIsExists(page_root);
  if (isExists) {
    Log.error(`当前目录已存在，请重新确认, path: ` + page_root);
    return;
  }
  // 创建文件夹
  await Util.createDir(page_root);
  // 复制文件
  Util.copyFolder(templateRoot, page_root, function () {
    Log.success(`创建项目成功, path: ` + page_root + `\n cd ${projectName} \n npm install \n npm run serve`);
  })
}

// Main
module.exports = function (name, template) {
  createProject(name, template);
};
