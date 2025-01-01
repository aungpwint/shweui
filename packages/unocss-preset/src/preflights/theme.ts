import type { Preflight } from '@unocss/core'
import type { ResolveShweUiOptions } from '../types'
import { resolveTheme } from '../helper'

export function themePreflight(options: ResolveShweUiOptions): Preflight {
    const { color } = options

    return {
        getCSS: () => resolveTheme(color).cssMinify
    }
}
