import type { CustomShortcut, SizeType } from '../types'
import { resolveRuleWithContext } from '../utils'

const Size: Record<SizeType, string> = {
    xs: 'px-2.5 py-1.5 text-xs rounded-md',
    sm: 'px-2.5 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2 text-sm rounded-md',
    lg: 'px-3.5 py-2.5 text-base rounded-lg'
}

export const button: CustomShortcut[] = [
    [
        /^btn-(.+)$/,
        ([, s], { theme }) => {
            if (s in Size) return Size[s as SizeType]
            return resolveRuleWithContext(s, theme, '--ui-color-context')
        }
    ],
    [
        'btn-default',
        `
        text-current bg-transparent
        inline-flex items-center justify-center gap-1 children:flex-shrink-0
        cursor-pointer shadow-sm
        border-(~ current) of-hidden
        `
    ],
    ['btn-text', `bg-transparent text-context dark:text-context shadow-none p0 border-0`],
    ['btn-link', `btn-text hover:(underline underline-offset-4)`],
    [
        'btn',
        `
        btn-default border-0
        `
    ],

    // button-group
    [
        /^btn-group(?:-(\w+))?$/,
        ([s]) => {
            const size = s ?? 'md'
            if (!(size in Size)) return
            return `
                flex items-center justify-center gap-2px
                [&>.btn]:(rounded-0 bg-[hsl(var(--color-gray-300))])
                dark:[&>.btn]:(bg-[hsl(var(--color-gray-700))])
                first:[&>.btn]:(rounded-l-md) last:[&>.btn]:(rounded-r-md)
                [&>.btn-group-active]:(bg-[hsl(var(--ui-color-500))])!
            `
        }
    ]
]
