import type { Preflight } from '@unocss/core'
import type { ResolveShweUiOptions } from '../types'
import { LAYER_SHWE_UI_PRELIGHT } from '../layers'
import { resetPreflight } from './reset'
import { themePreflight } from './theme'

export function preflights(options: ResolveShweUiOptions): Preflight[] {
    return options.preflights
        ? [resetPreflight, themePreflight(options)].map((p) => {
              return {
                  ...p,
                  layer: LAYER_SHWE_UI_PRELIGHT
              }
          })
        : []
}
