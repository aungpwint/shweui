import { theme as createTheme } from 'magic-color'

export function resolveTheme(color: string) {
    const theme = createTheme(color, {
        type: 'hsl'
        // render: meta => [`--ui-color-${meta[0]}`, meta[1].replace(/hsl\((.*)\)/, '$1')],
    })

    const themeMetas = Object.fromEntries(
        Object.entries(theme).map(([k, v]) => [`--ui-color-${k}`, v.replace(/hsl\((.*)\)/, '$1')])
    )

    const css = `
        :root {
            ${Object.entries(themeMetas)
                .map(([key, value]) => `${key}: ${value};`)
                .join('\n  ')}
                --ui-color-DEFAULT: var(--ui-color-500);
                --ui-color-text: var(--ui-color-100);
                --ui-color-text-invert: var(--ui-color-950);
            }

            .dark {
                --ui-color-DEFAULT: var(--ui-color-600);
                --ui-color-text: var(--ui-color-950);
                --ui-color-text-invert: var(--ui-color-100);
            }

            ::selection {
                color: hsl(var(--ui-color-DEFAULT) / 0.99) !important;
                background-color: hsl(var(--ui-color-text) / 0.99) !important;
        }    
    `.trim()

    return {
        css,
        theme,
        meta: themeMetas,
        cssMinify: css.replace(/\n\s*/g, '').replace(/\s*([{}:!])\s*/g, '$1')
    }
}
