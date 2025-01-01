import { toEscapedSelector as e } from 'unocss'
import type { CustomRule } from '../types'

export const overflow: CustomRule[] = [
    [
        /^overflow-ellipsis$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector} {
                text-overflow: ellipsis;
            }`
        }
    ]
]
