import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
* redirect: noredirect        When noredirect is set, the route is not clickable in the breadcrumb navigation.
* name:'router-name'          Set the name of the route. Be sure to fill it in, otherwise there will be various problems when using <keep-alive>
* meta : {
    hidden: true When set to true, the route will not appear in the sidebar, such as 404, login, and other pages (default false)

    alwaysShow: true When the number of children declared under a route is more than 1, it will automatically become a nested mode.
    When there is only one, the child route will be displayed in the sidebar as the root route.
    If you want to display your root route regardless of the number of children declared under the route,
    you can set alwaysShow: true, so that it will ignore the previously defined rules and
    always display the root route (default false)

    title: 'title' Set the name of the route displayed in the sidebar and breadcrumbs

    icon: 'svg-name' Set the icon of the route

    noCache: true If set to true, it will not be cached by <keep-alive> (default false)

    breadcrumb: false If set to false, it will not be displayed in the breadcrumb (default true)

    affixTab: true If set to true, it will always be fixed in the tag item (default false)

    noTagsView: true If set to true, it will not appear in the tag (default false)

    activeMenu: '/dashboard' Display the highlighted route path

    canTo: true Set to true Even if hidden is true, you can still jump to the route (default false)

    permission: ['edit', 'add', 'delete'] Set the permissions for this route
}
**/

interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    hideProgress?: boolean
    alwaysShow?: boolean
    title?: string
    icon?: string
    iframeSrc?: string
    noCache?: boolean
    breadcrumb?: boolean
    affixTab?: boolean
    activeMenu?: string
    noTagsView?: boolean
    canTo?: boolean
    permission?: string[]
    order?: number
    badge?: string
    badgeType?: 'dot' | 'normal'
    badgeVariants?: 'default' | 'destructive' | 'primary' | 'success' | 'warning' | string
    transition?: string
}

declare module 'vue-router' {
    interface RouteMeta extends RouteMetaCustom {}
}

type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

declare global {
    declare type AppRouteAccessModeType = 'backend' | 'frontend' | 'static'

    declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
        name: string
        meta: RouteMetaCustom
        component?: Component | string
        children?: AppRouteRecordRaw[]
        props?: Recordable
        fullPath?: string
    }

    declare interface AppCustomRouteRecordRaw
        extends Omit<RouteRecordRaw, 'meta' | 'component' | 'children'> {
        name: string
        meta: RouteMetaCustom
        component: string
        path: string
        redirect: string
        children?: AppCustomRouteRecordRaw[]
    }

    declare type ExRouteRecordRaw = {
        parent?: string
        parents?: string[]
        path?: any
    } & AppRouteRecordRaw

    declare interface MenuRecordBadgeRaw {
        badge?: string

        badgeType?: 'dot' | 'normal'

        badgeVariants?: 'destructive' | 'primary' | string
    }

    declare interface MenuRecordRaw extends MenuRecordBadgeRaw {
        children?: MenuRecordRaw[]

        disabled?: boolean

        icon?: string

        name: string

        order?: number

        parent?: string

        parents?: string[]

        path: string

        show?: boolean
    }
}
