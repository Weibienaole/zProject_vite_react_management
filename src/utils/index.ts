// 深拷贝
export function deepClone(target: any): any {
	let result
	if (typeof target === 'object') {
		if (Array.isArray(target)) {
			result = []
			for (const i in target) {
				result.push(deepClone(target[i]))
			}
		} else if (target === null) {
			result = null
		} else if (target.constructor === RegExp) {
			result = target
		} else {
			result = {}
			for (const i in target) {
				;(result[i] as unknown) = deepClone(target[i])
			}
		}
	} else {
		result = target
	}
	return result
}

// 重定向至登录页，并携带前地址信息
export const rewriteUrlInLogin = () => {
	const hashUrl = window.location.hash.slice(1)
	let suffix = ''
	if (hashUrl && hashUrl !== '/') {
		suffix = '?rewrite=' + encodeURIComponent(hashUrl)
	}
	window.location.replace(`#/login${suffix}`)
}

type IThrottle = (
	func: (props: any) => void,
	wait: number,
	options?: { leading?: boolean; trailing?: boolean }
) => () => void

// 节流 执行函数,间隔时间,设置{leading: 调用后是否立即执行一次,trailing: 结束后是否还要执行一次} 默认都为true，但都不能为false
export const throttle: IThrottle = (func, wait, options = {}) => {
	let timeout: any, context: any, args: any
	// 上一次的时间点
	let previous = 0

	const later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		func.apply(context, args)
		if (!timeout) context = args = null
	}

	const throttled: any = function () {
		// 拿到当前时间的时间戳
		const now = new Date().getTime()
		// 如果 上一次时间为0 且 不设置立即执行，将当前时间赋值给上次时间
		if (!previous && options.leading === false) previous = now
		// 当前空档时间 设定等待值 - (当前 - 上一次时间)
		const remaining = wait - (now - previous)
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		context = this
		// eslint-disable-next-line prefer-rest-params
		args = arguments
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
	}

	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = null
	}
	return throttled
}
