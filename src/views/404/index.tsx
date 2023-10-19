import { INavList } from '@/types'
import { Button, Result } from 'antd'
import { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const style = {
	width: '100vw',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const NotFound = (props: { permissionList: INavList[] }) => {
	const { permissionList = [] } = props
	const navigate = useNavigate()

	const type = useMemo(() => {
		if (permissionList.length === 0) {
			return 'noLogin'
		} else {
			return '404'
		}
	}, [permissionList])

	const renderContent = useCallback(() => {
		if (type === 'noLogin') {
			return (
				<Result
					status="warning"
					title="您还未登录，请登录后进行操作！"
					extra={
						<Button
							type="primary"
							key="goLogin"
							onClick={() => navigate('/login', { replace: true })}
						>
							去登录
						</Button>
					}
				/>
			)
		} else {
			return (
				<Result
					status="404"
					title="页面未找到"
					subTitle="对不起，您访问的页面不存在。"
					extra={
						<Button type="primary" onClick={() => navigate(-1)}>
							返回上一页
						</Button>
					}
				/>
			)
		}
	}, [type])

	return <div style={style}>{renderContent()}</div>
}

const mapStateToProps = (state) => ({
	permissionList: state.getIn(['core', 'permissionList']).toJS()
})

const RNotFound = connect(mapStateToProps, null)(NotFound)

export default RNotFound
