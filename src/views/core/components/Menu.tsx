import { useLayoutEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import type { MenuProps } from 'antd'
import { Menu as ANTD_Menu } from 'antd'
import { MenuSty } from '../style'
import {
	flatMenus,
	generateSidebarMenu,
	getKeyPath,
	usePageData
} from '../utils'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IMenuItem, INavList } from '@/types'

interface IProps {
	menuFold: boolean
	permissionList: INavList[]
	navIndex: number
}

const Menu = (props: IProps) => {
	const { menuFold, navIndex, permissionList } = props

	const navigate = useNavigate()
	const location = useLocation()
	const params = useParams()
	const coreContext = usePageData()

	const [openKeys, setOpenKeys] = useState([])
	const [selectedKeys, setSelectedKeys] = useState([])

	const sidebarMenu = useMemo(() => {
		const children = permissionList[navIndex]?.children || []
		const menuList = generateSidebarMenu(children)
		return menuList
	}, [navIndex]) as IMenuItem[]

	const isOne = useMemo(
		() => sidebarMenu.length < 2 && !(sidebarMenu[0] as any)?.children?.length,
		[sidebarMenu]
	)

	useLayoutEffect(() => {
		if (
			(!selectedKeys.length && !openKeys.length) ||
			selectedKeys[0] !== location.pathname
		) {
			fixMenuSelect()
		}
	}, [location.pathname])

	useLayoutEffect(() => {
		// 上面的selectedKeys[0] !== location.pathname 判断拦截nav时,redux还未更新,需要在navIndex更新后重新fix
		fixMenuSelect()
	}, [navIndex])

	// 开合处理
	const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
		const latestOpenKeyIndex = keys.findIndex(
			(key) => openKeys.indexOf(key) === -1
		)
		if (latestOpenKeyIndex !== -1) {
			setOpenKeys((ks) => [...ks, keys[latestOpenKeyIndex]])
		} else {
			setOpenKeys(keys)
		}
	}

	const handleSelect = (menuItem) => {
		const {
			item: {
				props: { path }
			},
			keyPath
		} = menuItem
		setSelectedKeys(keyPath)
		navigate(path)
	}

	const fixMenuSelect = (menu = sidebarMenu) => {
		const flatMenuList = flatMenus(menu)
		const currentPath = normalizePath(location.pathname, params)

		const currentItem = flatMenuList.find(
			(item) => item.path === currentPath && !item.children?.length
		)
		if (!currentItem) {
			return
		}
		const keys = currentItem.key.split('-')
		const keysPath = getKeyPath(keys)
		setSelectedKeys(keysPath)
		const keysGroup = keysPath.filter((key) => {
			const ks = key.split('-')
			return ks[ks.length - 1].indexOf('group') !== -1
		})
		setOpenKeys(keysGroup)
	}

	return (
		<MenuSty id="menu-container" $width={isOne ? 0 : coreContext.sideBarWid}>
			{!isOne && (
				<>
					<ANTD_Menu
						className="antd_menu_container"
						mode="inline"
						items={sidebarMenu}
						inlineCollapsed={menuFold}
						openKeys={openKeys}
						selectedKeys={[selectedKeys[0]] || []}
						onOpenChange={onOpenChange}
						onSelect={handleSelect}
					/>
					<div className="place"></div>
				</>
			)}
		</MenuSty>
	)
}

const mapStateToProps = (state) => ({
	menuFold: state.getIn(['core', 'menuFold']),
	navIndex: state.getIn(['core', 'navIndex']),
	permissionList: state.getIn(['core', 'permissionList']).toJS()
})

const RMenu = connect(mapStateToProps, null)(Menu)

export default RMenu

// /: 格式参数剔除
const normalizePath = (path, params) => {
	const values = Object.values(params)
	if (values.length === 0) {
		return path
	}
	const keys = path.split('/')
	const firstIdx = keys.indexOf(values[0])
	const newPath = keys.slice(0, firstIdx).join('/')
	return newPath
}
