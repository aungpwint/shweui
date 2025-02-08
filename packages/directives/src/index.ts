import type { App } from 'vue'
import focus from './focus'

const setDirective = (app: App<Element>) => {
    /**
     *
     * @methods v-focus
     */
    app.directive('focus', focus)
}

export default setDirective
