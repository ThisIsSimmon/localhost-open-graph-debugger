import type { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from './';

const meta = {
	component: SubmitButton,
	parameters: {
		backgrounds: {
			default: 'dark',
		},
	},
} satisfies Meta<typeof SubmitButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default = {
	args: {
		isLoading: false,
	},
} satisfies Story;

export const Loading = {
	args: {
		isLoading: true,
	},
} satisfies Story;
