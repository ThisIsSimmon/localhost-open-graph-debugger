import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta = {
	component: Spinner,
	parameters: {
		backgrounds: {
			default: 'dark',
		},
	},
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 16,
	},
};
