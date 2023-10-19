import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { App } from 'antd'
import { useEffect, useState } from 'react'
import screenfull from 'screenfull'
const FullScreen = () => {
	const { message } = App.useApp()

	const [isFull, setIsFull] = useState(false)

	useEffect(() => {
		screenfull.on('change', screenFullChange)
		return () => {
			screenfull.off('change', screenFullChange)
		}
	})

	const screenFullChange = () => {
		setIsFull(screenfull.isFullscreen)
	}

	const toggleFull = () => {
		if (!screenfull.isEnabled) {
			message.warning('浏览器版本过低，无法使用此功能！')
			return false
		}
		screenfull.toggle()
	}
	return (
		<>
			{isFull ? (
				<FullscreenExitOutlined className="icon" onClick={toggleFull} />
			) : (
				<FullscreenOutlined className="icon" onClick={toggleFull} />
			)}
		</>
	)
}
export default FullScreen
