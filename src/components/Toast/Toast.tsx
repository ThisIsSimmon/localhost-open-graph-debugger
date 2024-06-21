import { colors, easings } from '@/stylex/tokens.stylex';
import * as RadixToast from '@radix-ui/react-toast';
import * as stylex from '@stylexjs/stylex';
import { IconBellExclamation, IconChecks } from '@tabler/icons-react';

const slideIn = stylex.keyframes({
	'0%': { translate: '0 calc(-100% - var(--viewport-padding))' },
	'100%': { translate: '0 0' },
});

const slideOut = stylex.keyframes({
	'0%': { translate: '0 var(--radix-toast-swipe-end-y)' },
	'100%': { translate: '0 calc(-100% - var(--viewport-padding))' },
});

const styles = stylex.create({
	viewport: {
		position: 'fixed',
		top: 12,
		left: 12,
		right: 12,
	},
	root: {
		'--viewport-padding': 24,
		backgroundColor: colors.backgroundToast,
		borderRadius: 16,
		paddingInline: 16,
		paddingBlock: 14,
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		alignItems: 'flex-start',
		columnGap: 8,
		':is([data-swipe="move"])': {
			transform: 'translateY(var(--radix-toast-swipe-move-y))',
		},
		':is([data-swipe="cancel"])': {
			transform: 'translateY(0)',
			transition: `transform 250ms ${easings.easeInOutQuint} `,
		},
		':is([data-state="open"])': {
			animationName: slideIn,
			animationDuration: '200ms',
			animationEffect: easings.easeInOutQuint,
		},
		':is([data-state="closed"])': {
			animationName: slideOut,
			animationDuration: '200ms',
			animationEffect: easings.easeInOutQuint,
		},
	},
	content: {
		display: 'grid',
		rowGap: 8,
	},
	iconSuccess: {
		color: colors.toastSuccess,
	},
	iconFailed: {
		color: colors.toastFailed,
	},
	title: {
		fontSize: 15,
		fontWeight: 900,
		color: colors.text,
		lineHeight: 1,
	},
	description: {
		fontSize: 13,
		lineHeight: 1.25,
		color: colors.text,
		marginBlock: 'calc((1em - 1lh) / 2)',
	},
});

type Props = {
	type: 'success' | 'failed';
	title: string;
	description: string;
};

export const Toast = ({ type, title, description }: Props) => {
	return (
		<RadixToast.Provider swipeDirection='up'>
			<RadixToast.Root {...stylex.props(styles.root)} duration={60000}>
				{type === 'success' ? <IconChecks size={15} {...stylex.props(styles.iconSuccess)} /> : <IconBellExclamation size={15} {...stylex.props(styles.iconFailed)} />}
				<div {...stylex.props(styles.content)}>
					<RadixToast.Title {...stylex.props(styles.title)}>{title}</RadixToast.Title>
					<RadixToast.Description {...stylex.props(styles.description)}>{description}</RadixToast.Description>
				</div>
			</RadixToast.Root>
			<RadixToast.Viewport {...stylex.props(styles.viewport)} />
		</RadixToast.Provider>
	);
};
