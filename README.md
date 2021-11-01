# Vue Typescript Toolkit

The Vue Typescript command line interface (CLI) is your go-to tool for developing [vue-typescript][vue-typescript] apps.
vtx create - Create vue typescript template
vtx generate - Create Pages, Components,Services,Modals & vue Features

Automatically create framework features with vtx Generate. This command uses the commander CLI to generate features such as pages, components, directives, services, modals and more.

You can specify a path to nest your feature within any number of subdirectories. For example, specify a name of "pages/New Page" to generate page files at src/app/pages/new-page/.


### Installation

    ```
    npm install -g vue-ts-toolkit
    ```

### Usage:
    $ vtx create <name>
    $ vtx generate <type> <name>

### Inputs:

    type ................. The type of feature (e.g. page, component, directive, service)
    name ................. The name/path of the feature being generated

### Examples:
    $ vtx create myApp 
    $ vtx generate 
    $ vtx generate page
    $ vtx generate page contact
    $ vtx generate component contact/form
    $ vtx generate directive ripple -export=false
    $ vtx generate service api/user
    $ vtx generate modal user
    $ vtx g interface user
    $ vtx g class user


---

[vue-typescript]: https://cn.vuejs.org/v2/guide/typescript.html