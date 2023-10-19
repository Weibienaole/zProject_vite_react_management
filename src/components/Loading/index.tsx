import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

const loadingIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

interface IProps {
	id?: number
	delay?: number
	time?: number
	cb?: () => void
}

/**
 * @param {Number} id 唯一ID，随机数字
 * @param {Number} delay 延迟load ms
 * @param {Number} time 超时时长 ms
 * @param {Function} cb 超时回调
 */

class SelfLoading {
	private LoadNode: ReactNode
	private spinContainer: Element
	private coreRoot: Element = document.getElementById('Core_View_Container')
	private delayTimer: any

	id: number
	delay?: number
	time?: number
	cb?: () => void
	constructor(props: IProps) {
		this.id = props.id || Math.floor(Math.random() * 100000000)
		this.time = props.time || import.meta.env.VITE_REQ_TIMEOUT
		this.delay = props.delay || 0
		this.cb = props.cb
		this.create()
	}
	create() {
		this.spinContainer = document.createElement('div')
		this.spinContainer.id = `Componetn_SpinContainer_${this.id}`
		this.spinContainer.className = 'Componetn_SpinContainer'
		this.LoadNode = (
			<Spin
				indicator={loadingIcon}
				wrapperClassName="coreSpinWrapper"
				size="large"
			/>
		)
	}
	open() {
		if (this.coreRoot) {
			if (this.delay) {
				this.delayTimer = setTimeout(() => {
					this.insert()
					clearTimeout(this.delayTimer)
				}, this.delay)
			} else {
				this.insert()
			}
		}
	}
	close() {
		if (this.coreRoot) {
			if (this.delayTimer) {
				clearTimeout(this.delayTimer)
				this.delayTimer = null
			}
			this.spinContainer.remove()
		}
	}
	insert() {
		this.coreRoot.appendChild(this.spinContainer)
		createRoot(this.spinContainer).render(this.LoadNode)
		const timeoutTimer = setTimeout(() => {
			this.close()
			this.cb && this.cb()
			clearTimeout(timeoutTimer)
		}, this.time)
	}
	closeAll() {
		const targetDom = document.querySelectorAll('.Componetn_SpinContainer')
		if (targetDom.length) {
			for (let i = 0; i < targetDom.length; i++) {
				this.coreRoot.removeChild(targetDom[i])
			}
		}
	}
}

export default SelfLoading
