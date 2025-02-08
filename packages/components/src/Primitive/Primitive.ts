import { type Component } from 'vue'

export type AsTag =
    | 'a'
    | 'button'
    | 'div'
    | 'form'
    | 'h2'
    | 'h3'
    | 'img'
    | 'input'
    | 'label'
    | 'li'
    | 'nav'
    | 'ol'
    | 'p'
    | 'span'
    | 'svg'
    | 'ul'
    | 'template'
    | ({} & string) // any other string

export interface PrimitiveProps {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     *
     */
    asChild?: boolean
    /**
     * The element or component this component should render as. Can be overwrite by `asChild`
     * @defaultValue "div"
     */
    as?: AsTag | Component
}
