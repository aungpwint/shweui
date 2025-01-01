import { toEscapedSelector as e } from 'unocss'
import type { CustomRule } from '../types'

export const layoutBorder: CustomRule[] = [
    [
        /^layout-border__left$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector}:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 100%;
                background-color: var(--el-border-color);
                z-index: 3;
            }`
        }
    ],
    [
        /^layout-border__right$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector}:after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 1px;
                height: 100%;
                background-color: var(--el-border-color);
                z-index: 3;
            }`
        }
    ],
    [
        /^layout-border__top$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector}:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: var(--el-border-color);
                z-index: 3;
            }`
        }
    ],
    [
        /^layout-border__bottom$/,
        ([], { rawSelector }) => {
            const selector = e(rawSelector)
            return `
            ${selector}:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: var(--el-border-color);
                z-index: 3;
            }`
        }
    ]
]
