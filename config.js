
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
            floder: true
        },
        component: {
            commonds: ['component', 'c', 'com'],
            templatePath: 'page',
            export: true,
            dir: 'components',
            extend: true,
            floder: true
        },
        service: {
            commonds: ['service', 'api', 's'],
            templateString: `import { Http } from '@/http';\nexport class $PascalCaseModuleName$Service {\n    static items(data: any) {\n\n    }\n}`,
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
            floder: true
        },
        directive: {
            commonds: ['directive', 'd','dir'],
            templateString: `import { DirectiveOptions } from 'vue'\nexport const $camelCaseModuleName$: DirectiveOptions = {\n    inserted(el, binding, vnode: any) {\n\n    },\n    bind(el, binding, vnode: any) {\n\n    }\n}`,
            dir: 'directives',
            floder: false,
            export: true,
            extend: true
        },
        store: {
            commonds: ['store'],
            templateString: `import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'\nimport store from '@/store'\n\n@Module({ dynamic: true, store, name: '$fileName$' })\nclass $PascalCaseModuleName$ extends VuexModule {\n    state: 0 | 1 | 2 = 1;\n\n    @Mutation\n    private SET_STATE(val: any) {\n        this.state = val\n    }\n\n    @Action\n    changeState(val: any) {\n        this.SET_STATE(val)\n    }\n}\n\nexport const $PascalCaseModuleName$Module = getModule($PascalCaseModuleName$)`,
            floder: false,
            dir: 'store/modules',
            extend: true
        },
        class: {
            commonds: ['class', 'model','cl'],
            templateString: `export class $PascalCaseModuleName$ {\n    // name: string = ''\n    // construct(obj: any = {}) {\n    //     this.name = obj.name || ''\n    // }\n}`,
            dir: 'class',
            floder: false
        },
        interface: {
            commonds: ['interface', 'i'],
            templateString: `export interface I$PascalCaseModuleName$ {\n    name: String;\n    type: number;\n}`,
            dir: 'class',
            floder: false
        },
        enum: {
            commonds: ['enum', 'e'],
            templateString: `export interface E$PascalCaseModuleName$ {\n}`,
            dir: 'class',
            floder: false
        }
    }
};
