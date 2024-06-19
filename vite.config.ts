import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import styleX from 'vite-plugin-stylex';
import { manifest } from './manifest';

const isStorybook = process.env.STORYBOOK === 'true';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: isStorybook ? [react(), styleX()] : [react(), styleX(), crx({ manifest })],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
});
