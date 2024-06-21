import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';

const meta = {
	component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		type: 'success',
		title: 'Success',
		description: "The debug page has been opened in a new tab, let's take a look!",
	},
};

export const Failed: Story = {
	args: {
		type: 'failed',
		title: 'Failed',
		description: 'Check the error in the Console of DevTools',
	},
};
