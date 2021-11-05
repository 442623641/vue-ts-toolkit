const path = require('path');                         // 路径模块
const Log = require("./utils/log");                       // 控制台输出
const Files = require('./utils/file');                      // 工具函数
const Strings = require('./utils/string');                      // 工具函数
let Config = require('../config');                    // 获取配置项
const Colors = require('./utils/colors');
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
    Log.info(`generate - Create ${Colors.strong(`${Object.keys(Config.modules).join(',')}`)}`);
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
    fileName = Strings.toKebabCase(fileName);
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

  // 获取模板文件
  if (moduli.templateString) {
    Files.writeFileSync(filePath, `${extendFileName}.ts`, moduli.templateString, { type, moduleName: type == 'directive' ? fileName : Strings.toCamelCase(fileName), fileName })
    Log.success(`创建成功：${Colors.input(`${filePath}/${extendFileName}.ts`)}`);
  } else {
    let templatePath = path.join(Config.template, '/' + moduli.templatePath);
    let files = await Files.readDir(templatePath);
    // 复制文件
    await Files.copyFilesArr(templatePath, `${filePath}/${extendFileName}`, files);
    //导出路由模块
    if (type == 'page') {
      routeExport(fileName, options.router, filePath)
    }
    // 替换文件中的内容
    let newfiles = await Files.readDir(filePath);
    await Files.fileStrReplace(`${filePath}`, newfiles, { fileName, type, moduleName: Strings.toPascalCase(fileName) });

    // 成功提示
    Log.success(`创建成功：${Colors.input(`${filePath}`)}`);
    newfiles.forEach(v => {
      Log.success(v);
    })
  }


  //导出模块至index.ts
  if (options.export || options.export === undefined && moduli.export && inputFilePath == moduli.dir) {
    let exportStr = '';
    if (moduli.floder) {
      exportStr = `\nexport { default as ${Strings.toPascalCase(fileName)}${Strings.toPascalCase(type)} } from './${fileName}/${extendFileName}.vue';`
    } else {
      exportStr = `\nexport * from './${extendFileName}';`;
    }
    Files.writeFileSync(path.join(Config.entry, `src`, inputFilePath), 'index.ts', exportStr)
  }

}

const routeExport = async function (fileName, route, filePath) {
  let camelfileName = Strings.toCamelCase(fileName), parentPath = fileName, routerStr = '', pageRouteFilePath = filePath, childrenPath = '';
  let paths = filePath.split('/');

  switch ((route || 'root').toString().toLowerCase()) {
    case 'layout':
      if (paths.length > 3) {
        parentPath = paths[paths.length - 2];
        camelfileName = Strings.toCamelCase(parentPath)
        pageRouteFilePath = paths.slice(0, -1).join('/');
        childrenPath = `${fileName}`;
      }

      let pageRouteStr = `\n    {\n      path: '${childrenPath}',\n      component: () => import(/* webpackChunkName: "${fileName}-page" */ '@/${paths.slice(1).join('/')}/${fileName}.page.vue'),\n      name: '${fileName}-page',\n      meta: {\n        title: '${fileName}'\n      }\n    }\n  `
      let routingFilePath = path.join(pageRouteFilePath, `${camelfileName}.routing.ts`)

      let isExist = await Files.checkFileIsExists(routingFilePath);
      if (isExist) {
        Files.replaceTextSync(routingFilePath, [[`}\n  ]\n}`, `},${pageRouteStr}]\n}`]]);
        return
      }
      routerStr = `import { RouteConfig } from 'vue-router'\nimport Layout from '@/layout/index.vue'\n\nexport const ${camelfileName}Routing: RouteConfig = {\n  path: '/${parentPath}',\n  component: Layout,\n  redirect: '/${parentPath}/${childrenPath}',\n  meta: {\n    title: '${parentPath}',\n    icon: '${parentPath}'\n  },\n  children: [${pageRouteStr}]\n}`
      break;
    case 'true':
    case 'root':
      routerStr = `import { RouteConfig } from 'vue-router'\nexport const ${camelfileName}Routing: RouteConfig = {\n  path: '/${fileName}',\n  component: () => import(/* webpackChunkName: "${fileName}-page" */ '@/${paths.slice(1).join('/')}/${fileName}.page.vue'),\n  name: '${fileName}-page',\n  meta: {\n    title: '${fileName}',\n    icon: '${fileName}'\n  }\n}`
      break;
    default:
      break;
  }

  let routeFileName = `${camelfileName}.routing.ts`;

  Files.writeFileSync(pageRouteFilePath, routeFileName, routerStr);
  // 查看router/index.ts是否存在
  let routerIndexPath = path.join(Config.entry, `src`, 'router/index.ts')
  let isExist = await Files.checkFileIsExists(routerIndexPath);
  if (!isExist) return;
  let routeTag1 = `{\n    path: '/',`;
  Files.replaceTextSync(routerIndexPath, [['Vue.use\\(VueRouter\\)', `import { ${camelfileName}Routing } from '@${path.join(pageRouteFilePath, routeFileName).slice(3, -3)}'\nVue.use(VueRouter)`], [routeTag1, `${camelfileName}Routing,\n  ${routeTag1}`]]);
};