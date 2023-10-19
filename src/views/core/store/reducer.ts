import { SET_MENU_FOLD, SET_PERMISSION_LIST, SET_NAV_INDEX } from './constants'
import { fromJS } from 'immutable'

interface iActionProps {
	type: string
	data: any
}

const defaultState = fromJS({
	menuFold: false, // 是否合并sidebar
	permissionList: [], // 权限表
	navIndex: 0
})

const reducer = (state = defaultState, action: iActionProps) => {
	switch (action.type) {
		case SET_MENU_FOLD:
			return state.set('menuFold', action.data)
		case SET_PERMISSION_LIST:
			return state.set('permissionList', action.data)
		case SET_NAV_INDEX:
			return state.set('navIndex', action.data)
		default:
			return state
	}
}
export default reducer
