import { toEscapedSelector as e } from 'unocss'
import type { CustomRule } from '../types'

export const hover: CustomRule[] = [
    [
        /^custom-hover$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector} {
                display: flex;
                height: 100%;
                padding: 1px 10px 0;
                cursor: pointer;
                align-items: center;
                transition: background var(--transition-time-02);
            }
            ${selector}:hover {
                background-color: var(--top-header-hover-color);
            }
            .dark ${selector}:hover {
                background-color: var(--el-bg-color-overlay);
            }`
        }
    ]
]
