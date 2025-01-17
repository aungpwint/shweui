import { RawAxiosRequestHeaders } from 'axios'

declare global {
    declare type AxiosContentType =
        | 'application/json'
        | 'application/octet-stream'
        | 'application/x-www-form-urlencoded'
        | 'multipart/form-data'
        | 'text/plain'

    declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

    declare type AxiosResponseType =
        | 'arraybuffer'
        | 'blob'
        | 'document'
        | 'json'
        | 'text'
        | 'stream'

    declare interface AxiosConfig {
        params?: any
        data?: any
        url?: string
        method?: AxiosMethod
        headers?: RawAxiosRequestHeaders
        responseType?: AxiosResponseType
    }

    declare interface IResponse<T = any> {
        status: number
        success: boolean
        message: string
        data: T extends any ? T : T & any
    }
}
