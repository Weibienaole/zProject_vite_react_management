import { useLayoutEffect, useState } from 'react'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { staticRoutes } from './asyncRoutes'
import NotFound from '@/views/404'
import Core from '@/views/core'
import Login from '@/views/login'
import { deepClone } from '@/utils'
import { getPermission } from '@/views/core/store/actionCreators'

const baseRoute: RouteObject[] = [
	{
		path: '/',
		element: <Core />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/*',
		element: <NotFound />
	}
]

interface IProps {
	getPermissionDispatch: () => void
}

const Route = (props: IProps) => {
	const { getPermissionDispatch } = props
	const [ruotes, setRoutes] = useState(baseRoute)

	useLayoutEffect(() => {
		const isLogin = true // 判定login之后，获取权限，否则前往login
		if (isLogin) {
			//console.log(staticRoutes, 'staticRoutes')

			// 方案一：鉴权结束后，router为筛选后的可用路由，随后在baseRouter内进行赋值，但这样的话未拥有权限的页面将不再生成route，只会404，不会403
			setFilterRoutes('/', staticRoutes)
			// 方案二：直接根据接口返回的可用路由表，生成nav&sidebar，无权限页面403处理
			// 默认 二
			getAuth()
		} else {
			// login
		}
	}, [])

	const getAuth = async () => {
		await getPermissionDispatch()
	}

	const setFilterRoutes = (base: string, routes: RouteObject[]) => {
		const findIndex = baseRoute.findIndex((r) => r.path === base)
		const cloneRoutes = deepClone(baseRoute)
		if (findIndex >= 0) {
			cloneRoutes[findIndex].children = routes
		}

		setRoutes(cloneRoutes)
	}
	return (
		<>
			{/* 避免重复渲染 */}
			{ruotes[0].children ? (
				<RouterProvider router={createHashRouter(ruotes)} />
			) : null}
		</>
	)
}

const mapDispatchToProps = (dispatch) => ({
	//setNavRouteDispatch(data) {
	//  dispatch(setAuthRoutes(data))
	//},
	async getPermissionDispatch() {
		const auths = await dispatch(getPermission())
		return auths
	}
})

const RRoute = connect(null, mapDispatchToProps)(Route)

export default RRoute
