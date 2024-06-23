import { Background } from '@/components/Background';
import { Description } from '@/components/Description';
import { SubmitButton } from '@/components/SubmitButton';
import { Title } from '@/components/Title/Title';
import { Toast } from '@/components/Toast/Toast';
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
	const [state, dispatch] = useReducer(reducer, initialState);

	const doSomething = () => {
		console.log(document.body.innerHTML);
	};

	const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
		const queryOptions = { active: true, currentWindow: true };
		const [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	};

	const onSubmit = async () => {
		const tab = await getCurrentTab();
		if (tab.id === undefined) {
			dispatch({
				type: 'open',
				payload: {
					type: 'failed',
					title: 'Failed',
					description: 'Current tab not found',
				},
			});
			return;
		}

		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: doSomething,
		});
	};
	return (
		<>
			<Background />
			<Toast
				toast={{
					isOpen: state.isOpen,
					type: state.type,
					title: state.title,
					description: state.description,
				}}
				dispatch={dispatch}
			/>
			<div {...stylex.props(styles.container)}>
				<div {...stylex.props(styles.guide)}>
					<Title />
					<Description />
				</div>
				<SubmitButton onClick={onSubmit} />
			</div>
		</>
	);
}

export default App;
