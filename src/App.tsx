import { Provider } from 'react-redux'
// px转换
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs'
// 国际化 & App嵌套
import { ConfigProvider, App as AntdApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
// 默认中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// scroll
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import Route from './router'
import store from './store'

import GlobalStyle, { antdStyConfig } from './style'

dayjs.locale('en')

const App = () => {
	const px2rem = px2remTransformer({
		rootValue: 16
	})

	return (
		<>
			<Provider store={store}>
				<GlobalStyle />
				<ConfigProvider locale={zhCN} {...antdStyConfig}>
					<AntdApp>
						<StyleProvider transformers={[px2rem]}>
							<Route />
						</StyleProvider>
					</AntdApp>
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default App
