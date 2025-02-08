import type { Directive } from 'vue'

const focus: Directive = {
    mounted(el: Element) {
        const input = el instanceof HTMLInputElement ? el : el.querySelector('input')
        input?.focus()
    }
}

export default focus
