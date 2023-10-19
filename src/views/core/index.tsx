import { Suspense, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PerfectScrollbar from 'perfect-scrollbar'
import { message } from 'antd'

import { CoreSty } from './style'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Skeleton from '@/components/Skeleton'
import globalSty from '@/utils/global-style'
import { DataContext } from './utils'
import { setMenuFold } from './store/actionCreators'
import { getToken } from '@/utils/storage'
import { throttle } from '@/utils'
//import * as api from '@/api/core'

interface IProps {
	menuFold: boolean
	setMenuFoldDispatch: (bool: boolean) => void
}

const Core = (props: IProps) => {
	const { menuFold } = props
	const { setMenuFoldDispatch } = props

	const containerRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const token = getToken()

	useEffect(() => {
		handleWindowResize({ target: window })
		window.addEventListener('resize', throttleWindowResize)

		//api
		//	.testReq({
		//		wearUser: 32
		//		//wearDate: '2023-08-30'
		//	})
		//	.then(console.log)

		return () => window.removeEventListener('resize', throttleWindowResize)
	}, [])

	useEffect(() => {
		// token 查验，如果空强制login
		console.log(token, 'token')

		if (!token) {
			message.warning('请先登录后再进行操作！')
			navigate('/login')
		}
	}, [location.pathname])

	useLayoutEffect(() => {
		if (containerRef.current) {
			const scroll = new PerfectScrollbar(containerRef.current, {
				suppressScrollX: true
			})
			return () => scroll.destroy()
		}
	}, [])

	const sideBarWid = useMemo(
		() => (menuFold ? globalSty.sidebarFoldWid : globalSty.sidebarWid),
		[menuFold]
	)

	// 屏幕变化
	const handleWindowResize = ({ target }) => {
		if (target.innerWidth < 880) {
			setMenuFoldDispatch(true)
		} else if (target.innerWidth > 1400) {
			setMenuFoldDispatch(false)
		}
	}
	const throttleWindowResize = throttle(handleWindowResize, 300)
	return (
		<CoreSty id="Core_View_Container">
			<DataContext.Provider value={{ sideBarWid }}>
				<NavBar />
				<div className="flex">
					<Menu />
					<div id="container" ref={containerRef}>
						<Suspense fallback={<Skeleton />}>
							<Outlet />
						</Suspense>
					</div>
				</div>
			</DataContext.Provider>
		</CoreSty>
	)
}

const mapStateToProps = (state) => ({
	menuFold: state.getIn(['core', 'menuFold'])
})

const mapDispatchToProps = (dispatch) => ({
	setMenuFoldDispatch(bool) {
		dispatch(setMenuFold(bool))
	}
})

const RCore = connect(mapStateToProps, mapDispatchToProps)(Core)

export default RCore
