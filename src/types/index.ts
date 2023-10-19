import { MenuProps } from 'antd'
import type { ReactNode } from 'react'

export interface IRawRouter {
	key?: string
	module?: any
	index?: boolean
	nest?: boolean
	params?: IRawRouteParams
	children?: IRawRouter[]
}

export interface IRawRouteParams {
	title?: string
	hidden?: boolean
	[key: string]: unknown
}

export interface INavList {
	title: string
	defaultPath: string
	key: string
	children?: IMenuSecondChild[]
}

export interface IMenuSecondChild extends IMenuChild {
	icon: string | ReactNode
	children?: IMenuChild[]
}

export interface IMenuChild {
	title: string
	path?: string
	hidden?: boolean
	children?: IMenuChild[]
}

export type IMenuItem = Required<MenuProps>['items'][number]
