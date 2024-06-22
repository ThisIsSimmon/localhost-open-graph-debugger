import type { Meta, StoryObj } from '@storybook/react';

import { Description } from './Description';

const meta = {
	component: Description,
	parameters: {
		backgrounds: {
			default: 'dark',
		},
	},
} satisfies Meta<typeof Description>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
