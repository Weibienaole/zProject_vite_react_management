/* eslint-disable prettier/prettier */
/// <reference types="vite/client" />
import 'axios'

export declare global {
	interface Window{
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
	}
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    load?: boolean;
  }
}
