import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
	manifest_version: 3,
	name: 'Localhost Open Graph Debugger',
	version: '3.0',
	description: 'Localhost Open Graph Debugger is a Chrome extension designed to check the Open Graph meta tags on locally hosted websites.',
});
