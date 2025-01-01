import type { CustomShortcut } from '../types'
import { defaults } from './defaults'
import { button } from './button'

export const shortcuts: CustomShortcut[] = [defaults, button].flat()
