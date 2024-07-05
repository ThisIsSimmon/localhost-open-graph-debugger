import { colors } from '@/stylex/tokens.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
	base: {
		fontFamily: 'Mulish, sans-serif',
		fontSize: 18,
		fontWeight: 900,
		lineHeight: '1cap',
		textAlign: 'center',
		color: colors.text,
		marginBlockStart: '-0.7cap',
		paddingBlockEnd: '0.4cap',
		'::first-line': {
			fontSize: 'calc(44 / 18 * 1em)',
			lineHeight: '1.6cap',
		},
	},
});

export const Title = () => {
	return (
		<h1 {...stylex.props(styles.base)}>
			Localhost
			<br />
			Open Graph Debugger
		</h1>
	);
};
