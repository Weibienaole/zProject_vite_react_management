import { connect } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { NavsSty } from '../style'
import { INavList } from '@/types'
import { changeNavIndex } from '../store/actionCreators'
import { findNavDefaultRoute } from '../utils'

interface IProps {
	permissionList: INavList[]
	navIndex: number
	changeNavIndexDispatch: (index: number) => void
}

const Navs = (props: IProps) => {
	const { permissionList, navIndex } = props
	const { changeNavIndexDispatch } = props

	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		pathChange(location.pathname)
	}, [location.pathname])

	const switchNav = (index, isDefault = false) => {
		if (index !== navIndex) {
			changeNavIndexDispatch(index)
			isDefault && changeDefaultRoute(index)
		} else if (
			// 当前nav 但不是默认path
			permissionList[index] &&
			index === navIndex &&
			permissionList[index].defaultPath !== location.pathname &&
			isDefault
		) {
			changeDefaultRoute(index)
		}
	}

	// 找到并更新至默认路由
	const changeDefaultRoute = (index) => {
		//如果空，则没有menu，没有通过auth鉴权，或者logout被重置
		const targetMenu = permissionList[index] || {
			children: [],
			defaultPath: ''
		}
		console.log(targetMenu, 'targetMenu')

		const findRoute = findNavDefaultRoute(
			targetMenu.children,
			targetMenu.defaultPath
		)
		if (findRoute && findRoute.path && location.pathname !== findRoute.path) {
			navigate(findRoute.path)
		}
	}

	// 路径更改, 重新定位nav index
	const pathChange = (path) => {
		const key = path.split('/')[1] // /docs/children -> docs
		const findNavIndex = permissionList.findIndex((nav) => nav.key === key)
		if (findNavIndex !== -1) {
			switchNav(findNavIndex)
		} else {
			// 一般找不到直接404 这里暂留二搬情况
			switchNav(0, true)
		}
	}
	return (
		<NavsSty>
			{permissionList.map((nav, index) => (
				<span
					className={index === navIndex ? 'navItem acitveNav' : 'navItem'}
					key={nav.key}
					onClick={() => switchNav(index, true)}
				>
					{nav.title}
				</span>
			))}
		</NavsSty>
	)
}

const mapStateToProps = (state) => ({
	navIndex: state.getIn(['core', 'navIndex']),
	permissionList: state.getIn(['core', 'permissionList']).toJS()
})

const mapDispatchToProps = (dispatch) => ({
	changeNavIndexDispatch(index) {
		dispatch(changeNavIndex(index))
	}
})

const RNavs = connect(mapStateToProps, mapDispatchToProps)(Navs)

export default RNavs
