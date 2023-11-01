import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer' // 打包体积分析

export default defineConfig(({ command }: any) => {
	const isServe = command === 'serve'
	return {
		build: {
			sourcemap: false,
			rollupOptions: buildOutputOptions(!isServe)
		},
		plugins: [visualizer({ open: true })]
	}
})

function buildOutputOptions(isBuild: boolean) {
	if (!isBuild) return {}
	return {
		output: {
			chunkFileNames: 'assets/js/chunk_[name]-[hash:6].js', // 引入文件名的名称
			entryFileNames: 'assets/js/entry_[name]-[hash:6].js', // 包的入口文件名称
			assetFileNames: 'assets/[ext]/[name]-[hash:6].[ext]', // 资源文件像 字体，图片等
			manualChunks: {
				'react-vendor': ['react', 'react-dom'],
				'library-vender': ['antd'],
				'redux-vender': [
					'react-redux',
					'redux',
					'redux-immutable',
					'immutable',
					'redux-thunk'
				]
			}
		}
	}
}
