import { colors } from '@/stylex/tokens.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconExternalLink } from '@tabler/icons-react';

const styles = stylex.create({
	root: {
		color: colors.text,
		display: 'grid',
		rowGap: 24,
	},
	text: {
		fontSize: 13,
		fontFamily: 'Mulish, sans-serif',
		lineHeight: 1.25,
		textAlign: 'center',
		marginBlock: 'calc((1em - 1lh) / 1)',
		textWrap: 'balance',
	},
	link: {
		color: colors.primaryNormal,
		display: 'inline flex',
		alignItems: 'center',
		columnGap: '0.1em',
		':hover': {
			textDecoration: 'underline',
		},
	},
});

export const Description = () => {
	return (
		<div {...stylex.props(styles.root)}>
			<p {...stylex.props(styles.text)}>
				Open the local page you want to debug and press the "submit" button below.
				<br />
				This will send the og images and meta tags to{' '}
				<a href='https://og.nullnull.dev' target='_blank' rel='noreferrer noopener' {...stylex.props(styles.link)}>
					og.nullnull
					<IconExternalLink size={13} />
				</a>{' '}
				for temporary hosting.
			</p>
			<p {...stylex.props(styles.text)}>
				For information on our data handling policies, see the{' '}
				<a href='https://og.nullnull.dev/privacy' target='_blank' rel='noreferrer noopener' {...stylex.props(styles.link)}>
					Privacy Policy
					<IconExternalLink size={13} />
				</a>{' '}
				page.
			</p>
		</div>
	);
};
