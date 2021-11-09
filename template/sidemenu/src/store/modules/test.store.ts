import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'test' })
class Test extends VuexModule {
    text: string;

    @Mutation
    private SET_TEXT(val: string) {
        this.text = val
    }

    @Action
    changeText(val: string) {
        this.SET_TEXT(val)
    }
}

export const TestModule = getModule(Test)