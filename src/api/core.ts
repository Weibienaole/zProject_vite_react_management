import { request } from '@/utils/request'

export const testReq = (data) =>
	request({
		url: 'test',
		data,
		load: true
	})
