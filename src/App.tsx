import { Background } from '@/components/Background';
import { Description } from '@/components/Description';
import { SubmitButton } from '@/components/SubmitButton';
import { Title } from '@/components/Title/Title';
import { Toast } from '@/components/Toast/Toast';
import { submit } from '@/submit';
import type { ToastAction, ToastState } from '@/types';
import * as stylex from '@stylexjs/stylex';
import { useReducer } from 'react';

const styles = stylex.create({
	container: {
		display: 'grid',
		width: 'calc(100% - 60px)',
		marginInline: 'auto',
		paddingBlockEnd: 32,
	},
	guide: {
		display: 'grid',
		rowGap: 24,
		paddingBlock: 80,
	},
});

const initialState: ToastState = {
	isOpen: false,
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

function App() {
	const [toast, setToast] = useReducer(reducer, initialState);
	const [pending, togglePending] = useReducer((pending: boolean) => !pending, false);

	const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
		const queryOptions = { active: true, currentWindow: true };
		const [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	};

	const onSubmit = async () => {
		togglePending();

		const tab = await getCurrentTab();
		if (tab.id === undefined) {
			setToast({
				type: 'open',
				payload: {
					type: 'failed',
					title: 'Failed',
					description: 'Current tab not found',
				},
			});
			return;
		}

		const results = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: submit,
		});

		if (!results[0].result || results[0].result?.type === 'failed') {
			setToast({
				type: 'open',
				payload: {
					type: 'failed',
					title: 'Failed',
					description: 'Check the error in the Console of DevTools',
				},
			});
			togglePending();
			return;
		}

		const debugUrl = results[0].result.debugUrl;
		await chrome.tabs.create({ url: debugUrl, active: false });
		setToast({
			type: 'open',
			payload: {
				type: 'success',
				title: 'Success',
				description: "The debug page has been opened in a new tab, let's take a look!",
			},
		});
		togglePending();
	};
	return (
		<>
			<Background />
			<Toast
				toast={{
					isOpen: toast.isOpen,
					type: toast.type,
					title: toast.title,
					description: toast.description,
				}}
				setToast={setToast}
			/>
			<div {...stylex.props(styles.container)}>
				<div {...stylex.props(styles.guide)}>
					<Title />
					<Description />
				</div>
				<SubmitButton onClick={onSubmit} isLoading={pending} />
			</div>
		</>
	);
}

export default App;
