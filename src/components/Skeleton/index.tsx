import { Skeleton as ANTD_Skeleton, Space } from 'antd'

const Skeleton = () => {
	return (
		<>
			<Space>
				<ANTD_Skeleton.Button active block />
				<ANTD_Skeleton.Avatar active shape="circle" />
				<ANTD_Skeleton.Input active block />
			</Space>
			<br />
			<br />
			<ANTD_Skeleton active />
			<br />
			<br />
			<ANTD_Skeleton.Button active block />
			<br />
			<br />
			<ANTD_Skeleton active />
			<br />
			<br />
			<ANTD_Skeleton.Input active block />
			<br />
			<br />
			<ANTD_Skeleton active />
		</>
	)
}

export default Skeleton
