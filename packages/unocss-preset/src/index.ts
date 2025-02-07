import { definePreset } from 'unocss'
import type { Theme } from '@unocss/preset-mini'
import { random } from 'magic-color'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { rules } from './rules'
import { variants } from './variants'
import type { PrsetShweUiOptions, ResolveShweUiOptions } from './types'
import { preflights } from './preflights'
import { LAYER_SHWE_UI_PRESET, LAYER_SHWE_UI } from './layers'

const resolveOptions = (options: PrsetShweUiOptions = {}): ResolveShweUiOptions => ({
    color: options.color === 'auto' ? random() : options.color ?? 'auto',
    preflights: options.preflights ?? true,
    fonts: options.fonts ?? [],
    icons: { ...options.icons }
})

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
        extendTheme: (defaultTheme) => ({
            ...defaultTheme,
            colors: { ...defaultTheme.colors, ...theme(resolvedOptions).colors }
        })
    }
})
