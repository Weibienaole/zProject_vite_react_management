import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { connect } from 'react-redux'

import { NavBarSty } from '../style'
import FullScreen from './FullScreen'
import { logout, setMenuFold } from '../store/actionCreators'
import { usePageData } from '../utils'
import Navs from './Navs'
import { useNavigate } from 'react-router-dom'

interface IProps {
	menuFold: boolean
	setMenuFoldDispatch: (bool: boolean) => void
	logoutDispatch: () => void
}

const NavBar = (props: IProps) => {
	const { menuFold } = props
	const { setMenuFoldDispatch, logoutDispatch } = props

	const navigate = useNavigate()

	const { sideBarWid } = usePageData()

	const logout = async () => {
		await logoutDispatch()
		navigate('/login')
	}
	return (
		<NavBarSty>
			<div className="logoView" style={{ width: sideBarWid + 'px' }}>
				logo view
			</div>
			{menuFold ? (
				<MenuUnfoldOutlined
					className="icon menuFold"
					onClick={() => setMenuFoldDispatch(false)}
				/>
			) : (
				<MenuFoldOutlined
					className="icon menuFold"
					onClick={() => setMenuFoldDispatch(true)}
				/>
			)}
			<Navs />
			<div className="handles">
				<div className="userBasic">userbasic</div>
				<FullScreen />
				<Popconfirm
					title="登出"
					description="确认要退出登录吗？"
					onConfirm={logout}
					okText="登出"
					cancelText="取消"
				>
					<LogoutOutlined className="logout icon" />
				</Popconfirm>
			</div>
		</NavBarSty>
	)
}

const mapStateToProps = (state) => ({
	menuFold: state.getIn(['core', 'menuFold'])
})

const mapDispatchToProps = (dispatch) => ({
	setMenuFoldDispatch(bool) {
		dispatch(setMenuFold(bool))
	},
	logoutDispatch() {
		dispatch(logout())
	}
})

const RNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default RNavBar
