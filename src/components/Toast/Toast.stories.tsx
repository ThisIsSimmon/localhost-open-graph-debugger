import type { Meta, StoryObj } from '@storybook/react';

import type { ToastAction, ToastState } from '@/types';
import { useReducer } from 'react';
import { Toast } from './Toast';

const meta = {
	component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialState: ToastState = {
	isOpen: true,
	type: 'success',
	title: '',
	description: '',
};

const reducer = (state: ToastState, action: ToastAction): ToastState => {
	switch (action.type) {
		case 'open':
			return { ...state, isOpen: true, ...action.payload };
		case 'close':
			return { ...state, isOpen: false };
		default:
			return state;
	}
};

export const Success: Story = {
	args: {
		toast: {
			isOpen: true,
			type: 'success',
			title: 'Success',
			description: "The debug page has been opened in a new tab, let's take a look!",
		},
		setToast: () => {},
	},
	render: function Component({ ...args }) {
		const [toast, setToast] = useReducer(reducer, initialState);
		return (
			<Toast
				toast={{
					isOpen: toast.isOpen,
					type: args.toast.type,
					title: args.toast.title,
					description: args.toast.description,
				}}
				setToast={setToast}
			/>
		);
	},
};

export const Failed: Story = {
	args: {
		toast: {
			isOpen: true,
			type: 'failed',
			title: 'Failed',
			description: 'Check the error in the Console of DevTools',
		},
		setToast: () => {},
	},
	render: function Component({ ...args }) {
		const [toast, setToast] = useReducer(reducer, initialState);
		return (
			<Toast
				toast={{
					isOpen: toast.isOpen,
					type: args.toast.type,
					title: args.toast.title,
					description: args.toast.description,
				}}
				setToast={setToast}
			/>
		);
	},
};
