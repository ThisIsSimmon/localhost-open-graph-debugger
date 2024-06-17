import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
	manifest_version: 3,
	name: 'Localhost Open Graph Debugger',
	version: '3.0',
	description: 'Localhost Open Graph Debugger is a Chrome extension designed to check the Open Graph meta tags on locally hosted websites.',
	icons: {
		'16': 'src/assets/icon-16x16.png',
		'32': 'src/assets/icon-32x32.png',
		'48': 'src/assets/icon-48x48.png',
		'128': 'src/assets/icon-128x128.png',
	},
	action: {
		default_icon: {
			'16': 'src/assets/icon-16x16.png',
			'32': 'src/assets/icon-32x32.png',
			'48': 'src/assets/icon-48x48.png',
			'128': 'src/assets/icon-128x128.png',
		},
		default_title: 'Localhost Open Graph Debugger',
		default_popup: 'index.html',
	},
});
