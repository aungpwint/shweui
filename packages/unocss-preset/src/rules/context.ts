import { h, parseColor } from '@unocss/preset-mini/utils'
import { mc } from 'magic-color'
import { isThemeMetaKey, resolveContextColorByKey } from '../utils'
import type { CustomRule } from '../types'

export const contexts: CustomRule[] = [
    /**
     * o-<color> o-theme-<color>
     * Any color type for context. Will be converted to HSL.
     *
     * @example
     * o-red
     * o-#ff0
     * o-[rgb(255,255,0)]
     *
     * ```ts
     * {
     *  '--ui-color-context': 255 100 50,
     * }
     * ```
     *
     * @example
     * o-theme-100
     * o-theme-DEFAULT
     *
     * ```ts
     * {
     *  '--ui-color-context': var(--ui-color-100),
     * }
     * ```
     */
    [
        /^o-(theme-)?(.*)$/,
        (matches, { theme }) => resolveContextColorByKey(matches, theme, '--ui-color-context')
    ],

    /**
     * o-bg-<color> o-bg-theme-<color>
     * Background color for context.
     *
     * @example
     * o-bg-red
     */
    [
        /^o-bg-(theme-)?(.*)$/,
        (matches, { theme }) => resolveContextColorByKey(matches, theme, '--ui-color-bg')
    ],

    /**
     * o-text-<color> o-text-theme-<color>
     * Text color for context.
     *
     * @example
     * o-text-red
     */
    [
        /^o-text-(theme-)?(.*)$/,
        (matches, { theme }) => resolveContextColorByKey(matches, theme, '--ui-color-text')
    ],

    /**
     * o-border-<color> o-border-theme-<color>
     * Border color for context.
     *
     * @example
     * o-border-red
     */
    [
        /^o-border-(theme-)?(.*)$/,
        (matches, { theme }) => resolveContextColorByKey(matches, theme, '--ui-color-border')
    ],

    [
        /^bg-theme-(\w+)(?:[-:](\d+))?$/,
        ([, key, alpha]) => {
            key = key === 'context' ? 'bg' : key
            if (isThemeMetaKey(key)) {
                return {
                    '--un-bg-opacity': alpha ? `${Number.parseInt(alpha) / 100}` : '1',
                    'background-color': `hsl(var(--ui-color-${key}, var(--ui-color-context)) / var(--un-bg-opacity))`
                }
            }
        }
    ],
    [
        /^text-theme-(\w+)(?:[-:](\d+))?$/,
        ([, key, alpha]) => {
            key = key === 'context' ? 'text' : key
            if (isThemeMetaKey(key)) {
                return {
                    '--un-text-opacity': alpha ? Number.parseInt(alpha) / 100 : 1,
                    color: `hsl(var(--ui-color-${key}, var(--ui-color-context)) / var(--un-text-opacity))`
                }
            }
        }
    ],
    [
        /^border-theme-(\w+)(?:[-:](\d+))?$/,
        ([, key, alpha]) => {
            key = key === 'context' ? 'border' : key
            if (isThemeMetaKey(key)) {
                return {
                    '--un-border-opacity': alpha ? Number.parseInt(alpha) / 100 : 1,
                    'border-color': `hsl(var(--ui-color-${key}, var(--ui-color-context)) / var(--un-border-opacity))`
                }
            }
        }
    ],
    /**
     * Any variable for any value.
     *
     * @returns
     * ```ts
     *  {
     *    --ui-custom-variable: value
     *  }
     * ```
     *
     * @example
     * [variable::color]
     * [varibale::theme-50]
     * [varibale::theme-key-alpha]
     * [varibale::anything]
     */
    [
        /^\[([^:]+)::(.+?)(?:-(\d+))?\]$/,
        ([, variable, name, no], { theme }) => {
            const cssCustomKey = `--${variable}`
            if (name === 'theme' && no != null) {
                return {
                    [cssCustomKey]: `hsl(var(--ui-color-${no}) / 1)`
                }
            }

            const color = parseColor(`${name}${no ? `-${no}` : ''}`, theme)
            if (color) {
                let maybeColor = ''
                if (color.cssColor?.type === 'hsl') {
                    if (color.cssColor.components) {
                        maybeColor = `${color.cssColor.components.join(' ')}`
                    }
                } else {
                    if (color.color && mc.valid(color.color)) {
                        const magicColor = mc(color.color)
                        maybeColor = `${magicColor.hsl().join(' ')}`
                    }
                }

                if (maybeColor) {
                    const cssCustomOpacityKey = `${cssCustomKey}-opacity`
                    return {
                        [cssCustomOpacityKey]: color.cssColor?.alpha ?? 1,
                        [cssCustomKey]: `hsl(${maybeColor} / var(${cssCustomOpacityKey}))`
                    }
                }
            }

            return {
                [cssCustomKey]: h.bracket(name) ?? name
            }
        }
    ]
]
