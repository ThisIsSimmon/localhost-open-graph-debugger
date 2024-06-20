import { Spinner } from '@/components/Spinner';
import { colors, easings } from '@/stylex/tokens.stylex';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef } from 'react';

const styles = stylex.create({
	base: {
		backgroundColor: colors.backgroundButton,
		border: `1px solid  ${colors.borderButton}`,
		borderRadius: 10,
		color: colors.text,
		display: 'grid',
		fontSize: 16,
		fontWeight: 700,
		lineHeight: 1.25,
		minHeight: 'calc(40 / 16 * 1em)',
		paddingBlock: '0.4em',
		paddingInline: '1em',
		placeContent: 'center',
		transition: `border 200ms ${easings.easeOutExpo}, box-shadow 200ms ${easings.easeOutExpo}`,
		width: '100%',
		':focus-visible': {
			outlineColor: colors.primaryNormal,
		},
		':hover:not(:disabled), :focus-visible': {
			border: `1px solid  ${colors.borderButtonHover}`,
			boxShadow: `0 4px 16px 0  ${colors.boxShadowButtonHover}`,
		},
		':disabled': {
			cursor: 'not-allowed',
		},
	},
});

type Props = {
	isLoading?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const SubmitButton = ({ isLoading = false, ...props }: Props) => {
	return (
		<button type='submit' {...stylex.props(styles.base)} disabled={isLoading} {...props}>
			{isLoading ? <Spinner size={16} /> : 'Submit'}
		</button>
	);
};
