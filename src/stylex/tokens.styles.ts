import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
	primary: {
		normal: '#6441C3',
		strong: '#462C8C',
		weak: '#7C69B0',
	},
	warning: {
		normal: '#AE297F',
		strong: '#781C58',
		weak: '#AE568F',
	},
	text: {
		default: '#fff',
	},
	background: {
		button: 'rgb(255 255 255 / 0.1)',
		toast: 'rgb(from #0F0330 r g b / 0.4)',
	},
	toastIcon: {
		success: '#0FC970',
		failed: '#FBAA08',
	},
});
