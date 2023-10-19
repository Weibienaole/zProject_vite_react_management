import { fromJS } from 'immutable'
import { SET_MENU_FOLD, SET_PERMISSION_LIST, SET_NAV_INDEX } from './constants'
import { menuList } from '@/router/asyncRoutes'
import { removeToken, setToken } from '@/utils/storage'

export const setMenuFold = (bool) => ({
	type: SET_MENU_FOLD,
	data: bool
})

const setPermission = (list) => ({
	type: SET_PERMISSION_LIST,
	data: fromJS(list)
})

const setNavIndex = (index) => ({
	type: SET_NAV_INDEX,
	data: index
})

export const login = () => {
	return (dispatch) => {
		// get user basic req
		// set cookies
		setToken('testToken')
		dispatch(getPermission())
	}
}

export const getPermission = () => {
	return (dispatch) => {
		// req
		const auths = menuList
		dispatch(setPermission(auths))

		// 默认前往 下标为0 的nav
		dispatch(changeNavIndex(1))

		//return auths
	}
}

export const changeNavIndex = (index) => {
	return (dispatch) => {
		dispatch(setNavIndex(index))
		//const permissionList = getState().getIn(['core', 'permissionList']).toJS()
	}
}

export const logout = () => {
	// remove basic data
	// remove auths
	return (dispatch) => {
		removeToken()
		dispatch(setPermission([]))
		dispatch(changeNavIndex(1))
	}
}
