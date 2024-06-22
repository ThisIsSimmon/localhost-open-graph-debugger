import type { Meta, StoryObj } from '@storybook/react';

import { Background } from './Background';

const meta = {
	component: Background,
} satisfies Meta<typeof Background>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
