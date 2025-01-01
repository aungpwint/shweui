import type { CustomRule } from '../types'
import { masks } from './mask'
import { contexts } from './context'
import { color } from './color'
import { hover } from './hover'
import { overflow } from './overflow'
import { layoutBorder } from './layout-border'

export const rules: CustomRule[] = [masks, contexts, color, overflow, hover, layoutBorder].flat()
