import { connect } from 'react-redux'
import { LoginContainerSty } from './style'
import { login } from '../core/store/actionCreators'
import { useNavigate } from 'react-router-dom'

interface IProps {
	loginDispatch: () => void
}

const Login = (props: IProps) => {
	const { loginDispatch } = props
	const navigate = useNavigate()
	const login = async () => {
		await loginDispatch()
		navigate('/', { replace: true })
	}
	return (
		<LoginContainerSty>
			<div className="login" onClick={login}>
				loginIn
			</div>
		</LoginContainerSty>
	)
}

const mapDispatchToProps = (dispatch) => ({
	loginDispatch() {
		dispatch(login())
	}
})

const RLogin = connect(null, mapDispatchToProps)(Login)

export default RLogin
