// 扩大可点击区域
const extendClick = () => {
	return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      right: -10px;
      left: -10px;
    }
  `
}

const noWrap = () => {
	return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const noWraps = (line = 2) => {
	return `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${line};
    overflow: hidden;
  `
}

const bgFull = () => {
	return `
    background-position: 50%;
    background-size: auto;
    background-repeat: no-repeat;
  `
}

const positionCenter = () => {
	return `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `
}

// 固定地步横占80%左右的大按钮
const bottomBtn = () => {
	return `
    width: 42.5rem;
    height: 5rem;
    background: #2578f5;
    box-shadow: 0rem 0.13rem 0.5rem 0rem rgba(0, 0, 0, 0.04);
    border-radius: 0.13rem;
    position: fixed;
    bottom: 2.25rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1.75rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  `
}

// 页面基本配置
const containerBasicSet = () => {
	return `
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  `
}

const flexCenter = () => {
	return `
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

const setBorder = (direction: string, wid: number = 1) =>
	`border${direction ? '-' + direction : ''}: ${wid}px solid ${
		basicStyle.borderColor
	};`

const basicStyle = {
	sidebarWid: 256, // 侧边栏wid
	sidebarFoldWid: 80, // 侧边栏缩放的wid
	navbarHei: 60, // nav hei
	borderColor: 'rgba(5, 5, 5, 0.06)' // 默认边框颜色
}

const globalSty = {
	...basicStyle,
	extendClick,
	noWrap,
	noWraps,
	bgFull,
	positionCenter,
	bottomBtn,
	containerBasicSet,
	flexCenter,
	setBorder
}

export default globalSty
