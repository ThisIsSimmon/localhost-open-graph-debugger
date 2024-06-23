export type ToastState = {
	isOpen: boolean;
	type: 'success' | 'failed';
	title: string;
	description: string;
};

export type ToastAction = {
	type: 'open' | 'close';
	payload: {
		type: ToastState['type'];
		title: string;
		description: string;
	};
};
