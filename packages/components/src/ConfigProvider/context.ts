import { createContext } from '@/utils/createContext'
import type { ConfigProviderContextValue } from './type'

export const [injectConfigProviderContext, provideConfigProviderContext] =
    createContext<ConfigProviderContextValue>('ConfigProvider')
