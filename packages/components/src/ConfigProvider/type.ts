import type { Ref } from 'vue'

export interface ConfigProviderContextValue {
    dir?: Ref<Direction>
    scrollBody?: Ref<boolean | ScrollBodyOption>
    nonce?: Ref<string | undefined>
    useId?: () => string
}

export interface ConfigProviderProps {
    /**
     * The global reading direction of your application. This will be inherited by all primitives.
     * @defaultValue 'ltr'
     */
    dir?: Direction
    /**
     * The global scroll body behavior of your application. This will be inherited by the related primitives.
     * @type boolean | ScrollBodyOption
     */
    scrollBody?: boolean | ScrollBodyOption
    /**
     * The global `nonce` value of your application. This will be inherited by the related primitives.
     * @type string
     */
    nonce?: string
    /**
     * The global `useId` injection as a workaround for preventing hydration issue.
     */
    useId?: () => string
}
