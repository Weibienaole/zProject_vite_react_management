/* eslint-disable react-refresh/only-export-components */
import { IMenuChild, IMenuItem, IMenuSecondChild } from '@/types'
import { deepClone } from '@/utils'
import { createContext, useContext } from 'react'

interface IDataContext {
	sideBarWid: number
}
export const DataContext = createContext({} as IDataContext)

export const usePageData = () => {
	return useContext(DataContext)
}

// 生成Menu组件需要的结构
/*
	期望：

*/

export const generateSidebarMenu = (
	menu: IMenuSecondChild[],
	beforeKey?: string
): IMenuItem[] => {
	const filterHiddenMenu = menu.filter((m) => !m.hidden)
	return filterHiddenMenu.map((itemMenu, index) => {
		const key = itemMenu.children
			? `${beforeKey ? beforeKey + '-' : ''}group_${index}`
			: `${beforeKey ? beforeKey + '-' : ''}${itemMenu.path}`
		let children = null
		if (itemMenu.children?.length > 0) {
			children = itemMenu.children
			if (itemMenu.path) {
				// 有值，且有子集，将当前信息unshift到自己
				const cloneItem = deepClone(itemMenu)
				delete cloneItem.children
				delete cloneItem.icon
				children.unshift({
					...cloneItem
				})
			}
			children = generateSidebarMenu(children, key)
		}
		const Icon =
			typeof itemMenu.icon === 'string' ? (
				<img src={itemMenu.icon} className="menuSecondLevelIcon" />
			) : (
				itemMenu.icon
			)
		return {
			key,
			icon: Icon,
			label: itemMenu.title,
			path: itemMenu.path,
			children
		}
	})
}

// 在nav中找到合适的当前路径
// default未授权则默认选中第一个可用路由
export const findNavDefaultRoute = (
	menus: IMenuSecondChild[],
	path: string
): IMenuSecondChild | IMenuChild => {
	if (menus.length === 0 && !path) {
		return { title: '404', path: '/404' }
	}
	let findRoute = menus.find((item) => item.path === path)
	if (!findRoute) {
		const flatMenuList = flatMenus(menus)
		findRoute = flatMenuList.find((item) => item.path === path)
	}
	return findRoute
}

export const flatMenus = (menus, ars = []) => {
	menus.map((item) => {
		if (item.path) {
			ars.push(item)
		}
		if (item.children?.length > 0) {
			return flatMenus(item.children, ars)
		}
	})
	return ars
}

export const getKeyPath = (keys, paths = []) => {
	const key = [paths[0], keys.shift()].filter((it) => !!it).join('-')
	paths.unshift(key)
	if (keys.length > 0) {
		return getKeyPath(keys, paths)
	} else return paths
}
