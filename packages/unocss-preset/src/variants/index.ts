import type { Variant } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'

export const variants = [
    (input: string) => {
        const prefix = 'o-disabled:'
        if (input.startsWith(prefix)) {
            return {
                matcher: input.slice(prefix.length),
                selector: (input) => `[disabled] ${input}, ${input}[disabled]`
            }
        }
    }
] as Variant<Theme>[]
