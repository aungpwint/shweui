import { toEscapedSelector as e } from 'unocss'
import type { CustomRule } from '../types'

export const color: CustomRule[] = [
    [
        /^bg-color-(.*)$/,
        ([, color], { rawSelector }) => {
            const selector = e(rawSelector)
            return `${selector} { background-color: ${color}; }`
        }
    ]
]
