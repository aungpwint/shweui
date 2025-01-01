import type { Theme } from '@unocss/preset-mini'
import { mc } from 'magic-color'
import type { ResolveShweUiOptions } from '../types'

export function theme(options: ResolveShweUiOptions): Theme {
    const { color } = options
    const colors = mc.theme(color)

    // Gray basic color
    const grays = mc.theme('#888888')

    return {
        colors: {
            context: 'hsl(var(--ui-color-context) / %alpha)',
            primary: {
                DEFAULT: colors[500],
                ...colors
            },
            gray: {
                DEFAULT: grays[500],
                ...grays
            },
            accent: {
                DEFAULT: 'hsl(var(--accent))',
                foreground: 'hsl(var(--accent-foreground))',
                hover: 'hsl(var(--accent-hover))',
                lighter: 'has(val(--accent-lighter))'
            },
            background: {
                deep: 'hsl(var(--background-deep))',
                DEFAULT: 'hsl(var(--background))'
            },
            border: {
                DEFAULT: 'hsl(var(--border))'
            },
            foreground: {
                DEFAULT: 'hsl(var(--foreground))'
            },

            input: {
                background: 'hsl(var(--input-background))',
                DEFAULT: 'hsl(var(--input))'
            },
            muted: {
                DEFAULT: 'hsl(var(--muted))',
                foreground: 'hsl(var(--muted-foreground))'
            },
            popover: {
                DEFAULT: 'hsl(var(--popover))',
                foreground: 'hsl(var(--popover-foreground))'
            },
            card: {
                DEFAULT: 'hsl(var(--card))',
                foreground: 'hsl(var(--card-foreground))'
            },
            ring: 'hsl(var(--ring))'
        }
    }
}
