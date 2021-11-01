
module.exports = {

    // 根目录
    root: __dirname,

    // 执行命令目录路径
    dir_root: process.cwd(),

    // 项目路径
    entry: './',

    // 项目编译输出文件夹
    output: './',

    // 模版目录
    template: __dirname + '/template',
    modules: {
        page: {
            commonds: ['page', 'p'],
            templatePath: 'page',
            dir: 'pages',
            export: false,
            router: true,
            extend: true,
            floder:true
        },
        component: {
            commonds: ['component', 'c', 'com'],
            templatePath: 'page',
            export: true,
            dir: 'components',
            extend: true,
            floder:true
        },
        service: {
            commonds: ['service', 'api', 's'],
            templateString: `import { Http } from '@/http';
            export class $moduleName$Service {
              static items(data: any) {
            
              }
            }`,
            dir: 'services',
            floder: false,
            extend: true
        },
        modal: {
            commonds: ['modal', 'm', 'md'],
            templatePath: 'page',
            export: true,
            dir: 'modals',
            extend: true,
            floder:true
        },
        directive: {
            commonds: ['directive', 'd'],
            templateString: `import { DirectiveOptions } from 'vue'
            export const $moduleName$: DirectiveOptions = {
              inserted(el, binding, vnode: any) {
            
              },
              bind(el, binding, vnode: any) {
                
              }
            }`,
            dir: 'directives',
            floder: false,
            export: true,
            extend: true
        },
        class: {
            commonds: ['class', 'model'],
            templateString: `export class $moduleName$ {
                construct() { }
            }`,
            dir: 'class',
            floder: false
        },
        interface: {
            commonds: ['interface', 'i'],
            templateString: `export interface I$moduleName$ {
            }`,
            dir: 'class',
            floder: false
        }

    }
};
