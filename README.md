# Vite+React

## 技术栈
- Vite@4
- React
- react-router@6
- antd-mobile@5
- redux&immutable
- styled-components
- eslint&prettier

## 点
- 默认具备骨架屏加载(src/componrnts/LoadSkeleton)、错误边界(只限于在core之内，之外额外在baseRoute中设置)(src/componrnts/ErrorBoundary)、404(src/views/404)
- 全局已配置的规则，默认开发软件为VSCode(已设置配置文件)
- store内的复杂数据一律保证immutable化，配合immutable处理
- 基本全局配置在config中的env分别设置
- mobile下core可以什么都不做，只是一个包裹，具体是在其下面做处理
- 默认配置src路径别名为 @

## rules
- style组件默认后缀为 Sty example： home组件的顶级style组件就是 
```html
<ContainerSty><ContainerSty/>
``` 
- 请求文件统一从api中以views相同的结构进行创建，使用是以：
```js
import * as api from '@/api/home'

api.testApi({
	// ...datas
}).then(console.log)
```
- 项目内默认以驼峰形式开发
- 普通页面的路由存放至 src/router/asyncRoutes
- 使用redux存放内容时，规则如下：
```jsx
const Test = (props) => {
	// 对于不同入口进行区分
	const { testObj } = props
	const { setTestObjDispatch } = props
	const { ...otherProps } = props
}

const mapStateToProps = (state) => ({
	testObj: state.getIn(['core', 'testObj']).toJs()
})

const mapDispatchToProps = (dispatch) => ({
	// dispatch方法都要添加后缀进行分辨
	setTestObjDispatch(key) {
		dispatch(setTestObjDis(key))
	}
})

// eslint
const RTest = connect(mapStateToProps, mapDispatchToProps)(Test)
export RTest
```
- 全局样式在src/style.ts下，公共样式在src/utils/global-style.ts下