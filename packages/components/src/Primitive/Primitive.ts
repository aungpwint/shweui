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

export const Primitive = defineComponent({
    name: 'Primitive',
    inheritAttrs: false,
    props: {
        asChild: {
            type: Boolean,
            default: false
        },
        as: {
            type: [String, Object] as PropType<AsTag | Component>,
            default: 'div'
        }
    },
    setup(props, { attrs, slots }) {
        const asTag = props.asChild ? 'template' : props.as

        // For self closing tags, don't provide default slots because of hydration issue
        const SELF_CLOSING_TAGS = ['area', 'img', 'input']
        if (typeof asTag === 'string' && SELF_CLOSING_TAGS.includes(asTag))
            return () => h(asTag, attrs)

        if (asTag !== 'template') return () => h(props.as, attrs, { default: slots.default })

        return () => h(Slot, attrs, { default: slots.default })
    }
})
