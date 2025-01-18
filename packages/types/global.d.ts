declare global {
    declare interface Fn<T = any> {
        (...arg: T[]): T
    }

    declare type Nullable<T> = T | null

    declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

    declare type Recordable<T = any, K = string> = Record<
        K extends null | undefined ? string : K,
        T
    >

    declare type RemoveReadonly<T> = {
        -readonly [P in keyof T]: T[P]
    }

    declare type ComponentRef<T> = InstanceType<T>

    declare type TimeoutHandle = ReturnType<typeof setTimeout>
    declare type IntervalHandle = ReturnType<typeof setInterval>

    /**
     * if padding or margin is number, it will be in px
     * if padding or margin is true, it will be var(--scrollbar-width)
     * otherwise, it will be passed string
     */
    declare type ScrollBodyOption = {
        padding?: boolean | number | string
        margin?: boolean | number | string
    }

    declare type Breakpoints = '' | '2xl:' | '3xl:' | 'lg:' | 'md:' | 'sm:' | 'xl:'

    declare type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

    // **************** Application ****************

    declare type DataOrientation = 'vertical' | 'horizontal'

    declare type Direction = 'ltr' | 'rtl'

    declare type SupportedLanguagesType = 'en-US' | 'my' | 'zh-CN'

    declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

    declare type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu' | 'fullContent'

    declare type LayoutPositionType = 'panel-center' | 'panel-left' | 'panel-right'

    declare type ThemeModeType = 'auto' | 'dark' | 'light'

    declare type OverlayTheme = 'default' | 'night-light' | 'dark-blue' | 'filter'

    declare type PageTransitionType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up'

    declare type BreadcrumbStyleType = 'background' | 'normal'

    declare type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain'

    declare type LoginExpiredModeType = 'modal' | 'page'

    declare interface ThemeTypes {
        elColorPrimary?: string
        leftMenuBorderColor?: string
        leftMenuBgColor?: string
        leftMenuBgLightColor?: string
        leftMenuBgActiveColor?: string
        leftMenuCollapseBgActiveColor?: string
        leftMenuTextColor?: string
        leftMenuTextActiveColor?: string
        logoTitleTextColor?: string
        logoBorderColor?: string
        topHeaderBgColor?: string
        topHeaderTextColor?: string
        topHeaderHoverColor?: string
        topToolBorderColor?: string
    }

    declare type BuiltinThemeType =
        | 'custom'
        | 'deep-blue'
        | 'deep-green'
        | 'default'
        | 'gray'
        | 'green'
        | 'neutral'
        | 'orange'
        | 'pink'
        | 'red'
        | 'rose'
        | 'sky-blue'
        | 'slate'
        | 'stone'
        | 'violet'
        | 'yellow'
        | 'zinc'
        | (Record<never, never> & string)
}
