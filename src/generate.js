const path = require('path');                         // 路径模块
const Log = require("./utils/log");                       // 控制台输出
const Files = require('./utils/file');                      // 工具函数
const Strings = require('./utils/string');                      // 工具函数
let Config = require('../config');                    // 获取配置项

// Main
module.exports = function (type, name, createDir) {
  generate(type, name, createDir);
};

async function generate(type, inputPath, options) {
  for (const key in Config.modules) {
    if (key == type) break;
    if (Config.modules[key].commonds.includes(type)) {
      type = key;
      break
    }
  }
  let moduli = Config.modules[type];
  if (!moduli) {
    Log.info(`generate - Create ${Object.keys(Config.modules).join(',')}`);
    return Log.error(`Generators are not supported in this project type ${type}.`);
  }

  // 业务文件夹路径
  let inputFilePath = ''
  let fileName = ''
  if (inputPath.indexOf('/') > -1) {
    inputFilePath = inputPath.slice(0, inputPath.lastIndexOf('/'))
    fileName = inputPath.slice(inputPath.lastIndexOf('/') + 1, inputPath.length)
  } else {
    inputFilePath = moduli.dir;
    fileName = inputPath
  }

  let filePath = path.join(Config.entry, `src`, inputFilePath);
  let extendFileName = '';

  //创建模块文件夹
  if (moduli.floder !== false) {
    fileName = Strings.convertToPath(fileName);
    filePath = path.join(filePath, fileName);
    extendFileName = fileName + (moduli.extend ? ('.' + (typeof (moduli.extend) == 'string' ? moduli.extend : type)) : '');
    // 查看文件夹是否存在
    let isExists = await Files.checkFileIsExists(filePath);
    if (isExists) return Log.error(`${filePath} 已存在`);
    // 创建文件夹
    await Files.createDir(filePath);
  } else {
    extendFileName = fileName + (moduli.extend ? ('.' + (typeof (moduli.extend) == 'string' ? moduli.extend : type)) : '');
    let fullFilePath = path.join(filePath, `${extendFileName}.ts`);
    let isExists = await Files.checkFileIsExists(fullFilePath);
    if (isExists) return Log.error(`${fullFilePath} 已存在`);
    await Files.checkFileIsExists(filePath) || await Files.createDir(filePath);
  }

  console.log(filePath)
  // 查看文件夹是否存在
  // let isExists = await Files.checkFileIsExists(filePath);
  // if (isExists) return Log.error(`${filePath} 已存在`);
  // 创建文件夹
  // await Files.createDir(filePath);

  // 获取模板文件
  if (moduli.templateString) {
    Files.writeFileSync(filePath, `${extendFileName}.ts`, moduli.templateString, { type, moduleName: type == 'directive' ? fileName : Strings.convertToModule(fileName) })
    Log.success(`创建成功：${filePath}/${extendFileName}.ts`);
  } else {
    let templatePath = path.join(Config.template, '/' + moduli.templatePath);
    let files = await Files.readDir(templatePath);
    // 复制文件
    await Files.copyFilesArr(templatePath, `${filePath}/${extendFileName}`, files);
    //导出路由模块
    if (type == 'page' && options.router) {
      let routerStr = `
      import { RouteConfig } from 'vue-router'
      import Layout from '@/layout/index.vue'
      
      export const ${fileName}Routing: RouteConfig = {
        path: '/${fileName}',
        component: Layout,
        redirect: '/${fileName}',
        children: [
          {
            path: '',
            component: () => import(/* webpackChunkName: "${fileName}-page" */ '@/pages/${fileName}/${fileName}.page.vue'),
            name: '${fileName}-page',
            meta: {
              title: '${fileName}',
              icon: '${fileName}'
            }
          }
        ]
      }`
      Files.writeFileSync(filePath, `${fileName}.routing.ts`, routerStr);
    }
    // 替换文件中的内容
    let newfiles = await Files.readDir(filePath);
    await Files.fileStrReplace(`${filePath}`, newfiles, { fileName, type, moduleName: Strings.convertToModule(fileName) });

    // 成功提示
    Log.success(`创建成功：${filePath}`);
    newfiles.forEach(v => {
      Log.success(v);
    })
  }


  //导出模块至index.ts
  if (options.export || options.export === undefined && moduli.export && inputFilePath == moduli.dir) {
    let exportStr = '';
    if (moduli.floder) {
      exportStr = `\nexport { default as ${Strings.convertToModule(fileName)}${Strings.convertToModule(type)} } from './${fileName}/${extendFileName}.vue';`
    } else {
      exportStr = `\nexport * from './${extendFileName}';`;
    }
    Files.writeFileSync(path.join(Config.entry, `src`, inputFilePath), 'index.ts', exportStr)
  }

}