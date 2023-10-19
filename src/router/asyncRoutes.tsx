import {
	AppstoreAddOutlined,
	BorderRightOutlined,
	FileWordOutlined,
	HomeOutlined
} from '@ant-design/icons'

import { INavList, IRawRouter } from '@/types'
import { ReactComponent as CosIcon } from '@/assets/cos.svg'
import { generateRouters } from './utils'

/*
  rules:
  每个路由都是真实存在的，二级标题导航（没有实际路由，只是标识，或者一个块）通过权限增加
  嵌套路由通过 nest 设置，且嵌套路由需要手动在父级添加 <Outlet /> 组件。默认情况下父子路由不相关
  所有和路由生成无关的参数全部集合在params中
  key为拼接path的最后一个,一般为文件路径的名称
	
  routes = [
    key: string,
    module: function,
    params: object 页面基本参数
    childrens: [
      ...routes
    ]
  ]
*/

/*
	menu rules 这里模拟接口返回的数据组，icon可以是img src-url
	分为一级nav，二级及以下sidebar
	nav栏如果只有一个页面可以只设置defaultPath，默认不显示sidebar，两个以上页面显示。
	sidebar二级必须具有icon，最多到？？？级，没有path为group组进行子级的包裹
*/
export const menuList: INavList[] = [
	{
		title: '首页',
		defaultPath: '/',
		key: 'home',
		children: [
			{
				title: '首页',
				path: '/',
				icon: <HomeOutlined />
			}
		]
	},
	{
		title: '文档',
		defaultPath: '/docs',
		key: 'docs',
		children: [
			{
				title: '文档列',
				path: '/docs',
				icon: <BorderRightOutlined />
			},
			{
				title: '子级一',
				path: '/docs/child',
				icon: <FileWordOutlined />
			},
			{
				title: '子级二组',
				icon: 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci84ZDk0YTZlYTYzNGQ4YzQ0YzhlZjllOGFjOWQ3YTM1Yz9zaXplPTUwJmRlZmF1bHQ9cmV0cm8ifQ.niOnpoY6xsO7gafvhs2DbfmBLcwUbWWxKGrojt_IHE4',
				children: [
					{
						title: '子级二',
						path: '/docs/child2'
					},
					{
						title: '子级二---一',
						path: '/docs/child3',
						children: [
							{
								title: '子级四',
								path: '/docs/child3/child'
							}
						]
					}
				]
			},
			{
				title: '子级wu组',
				icon: <FileWordOutlined />,
				children: [
					{
						title: '子级wu',
						path: '/docs/child5'
					}
				]
			}
		]
	},
	{
		title: '新增',
		defaultPath: '/add',
		key: 'add',
		children: [
			{
				title: '新增页',
				path: '/add',
				icon: <AppstoreAddOutlined />,
				children: [
					{
						title: '新增详情',
						path: '/add/detail'
					}
				]
			}
		]
	},
	{
		title: 'COS',
		defaultPath: '/cos',
		key: 'cos',
		children: [
			{
				title: '我COS',
				path: '/cos',
				icon: <CosIcon />,
				children: [
					{
						title: 'cos child',
						path: '/cos/child'
					}
				]
			}
		]
	}
]

export const rawRoutes: IRawRouter[] = [
	{
		index: true, // 默认首显的页面
		module: () => import('@/views/home')
	},
	{
		key: 'docs',
		module: () => import('@/views/docs'),
		params: {
			title: 'dddddocs'
		},
		children: [
			{
				key: 'child',
				module: () => import('@/views/docs/child')
			},
			{
				key: 'child2',
				module: () => import('@/views/docs/child/child2')
			},
			{
				key: 'child3',
				module: () => import('@/views/docs/child/child3'),
				children: [
					{
						key: 'child',
						module: () => import('@/views/docs/child/child4')
					}
				]
			},
			{
				key: 'child5',
				module: () => import('@/views/docs/child/child5')
			}
		]
	},
	{
		key: 'add',
		module: () => import('@/views/add'),
		nest: true,
		children: [
			{
				key: 'detail',
				module: () => import('@/views/add/detail')
			},
			{
				key: 'detail/:id',
				module: () => import('@/views/add/detail')
			}
		]
	},
	{
		key: 'cos',
		module: () => import('@/views/docs'),
		children: [
			{
				key: 'child',
				module: () => import('@/views/docs')
			}
		]
	}
]

export const staticRoutes = generateRouters(rawRoutes)
