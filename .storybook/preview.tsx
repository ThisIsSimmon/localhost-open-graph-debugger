import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/index.css';
import '@fontsource/mulish/400.css';
import '@fontsource/mulish/700.css';
import '@fontsource/mulish/900.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [Story => <Story />],
};

export default preview;
