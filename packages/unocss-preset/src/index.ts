import {
    definePreset,
    presetUno,
    presetWind,
    presetTagify,
    presetAttributify,
    presetIcons,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
    transformerCompileClass
} from 'unocss'
import type { Theme } from '@unocss/preset-mini'
import { random } from 'magic-color'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { rules } from './rules'
import { variants } from './variants'
import type { PrsetShweUiOptions, ResolveShweUiOptions } from './types'
import { preflights } from './preflights'
import { LAYER_SHWE_UI_PRESET, LAYER_SHWE_UI } from './layers'

function resolveOptions(options: PrsetShweUiOptions = {}): ResolveShweUiOptions {
    const defaultOptions: Required<PrsetShweUiOptions> = {
        color: 'auto',
        preflights: true,
        fonts: [], // 'DM Sans', 'DM Sans:400,700'
        icons: {}
    }

    const resolvedOptions: ResolveShweUiOptions = {
        ...defaultOptions,
        ...options,
        color: options.color === 'auto' ? random() : options.color!,
        icons: {
            ...defaultOptions.icons,
            ...(options.icons ?? {})
        }
    }

    return resolvedOptions
}

export type { PrsetShweUiOptions }

export const presetShweUi = definePreset<PrsetShweUiOptions, Theme>((options) => {
    const resolvedOptions = resolveOptions(options)

    return {
        name: '@shweui/unocss-preset',
        layer: LAYER_SHWE_UI_PRESET,
        layers: LAYER_SHWE_UI,
        rules,
        shortcuts,
        variants,
        preflights: preflights(resolvedOptions),
        presets: [
            presetUno({ preflight: resolvedOptions.preflights, dark: 'class', attributify: false }),
            presetWind(), // { important: '#app'}
            presetAttributify(),
            presetTagify({
                prefix: 'un-'
            }),
            presetIcons({}),
            presetWebFonts({
                fonts: {
                    onu: resolvedOptions.fonts
                },
                inlineImports: false
            })
        ],
        transformers: [
            transformerDirectives({
                applyVariable: ['--at-apply', '--uno-apply', '--uno']
            }),
            transformerVariantGroup(),
            transformerCompileClass({
                classPrefix: 'uno-'
            })
        ],
        extendTheme(defaultTheme) {
            const { colors } = theme(resolvedOptions)

            return {
                ...defaultTheme,
                colors: {
                    ...defaultTheme.colors,
                    ...colors
                }
            }
        },
        options: resolvedOptions
    }
})
