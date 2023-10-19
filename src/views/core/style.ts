import globalSty from '@/utils/global-style'
import styled from 'styled-components'

export const CoreSty = styled.div`
	min-width: 100vw;
	max-width: 100vw;
	width: 100vw;
	min-height: 100vh;
	position: relative;
	overflow-y: auto;
	background-color: #fff;
	.flex {
		width: 100vw;
		height: calc(100vh - ${globalSty.navbarHei}px);
		display: flex;
		#container {
			flex: 1;
			position: relative;
			padding: 10px;
		}
	}
`

export const MenuSty = styled.div<{ $width: number }>`
	width: ${({ $width }) => $width}px;
	height: 100%;
	display: flex;
	flex-direction: column;
	.antd_menu_container {
		border-inline-end: none;
		/* Menu 自定的 url icon */
		.menuSecondLevelIcon {
			width: 15px;
			height: 15px;
		}
	}
	.place {
		flex: 1;
		${globalSty.setBorder('inline-end')}
	}
`

export const NavBarSty = styled.div`
	position: relative;
	z-index: 10;
	height: ${globalSty.navbarHei}px;
	width: 100vw;
	background: #fff;
	box-shadow:
		0 1px 3px #0000001f,
		0 0 3px #0000000a;
	display: flex;
	.logoView {
		transition: all 0.3s;
		height: 100%;
		width: ${globalSty.sidebarWid}px;
	}
	.handles {
		display: flex;
		height: 100%;
		padding: 10px;
		.logout {
			margin-right: 10px;
		}
	}
	.icon {
		font-size: 27px;
		margin-left: 20px;
		color: #444;
		cursor: pointer;
	}
	.menuFold {
		margin: 0 20px;
	}
`

export const NavsSty = styled.ul`
	flex: 1;
	height: 100%;
	display: flex;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none; // 隐藏滚动条
	}
	.navItem {
		padding: 10px 20px;
		line-height: ${globalSty.navbarHei - 10 * 2}px;
		cursor: pointer;
		white-space: nowrap;
		${globalSty.setBorder('left')};
		&:last-child {
			${globalSty.setBorder('right')};
		}
	}
	.acitveNav {
		background-color: #e6f4ff;
		color: #1677ff;
	}
`
