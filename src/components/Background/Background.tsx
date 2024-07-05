import { colors } from '@/stylex/tokens.stylex';
import * as stylex from '@stylexjs/stylex';
import BackgroundImage from './background.png';

const styles = stylex.create({
	base: (imageUrl: string) => ({
		backgroundImage: `url("${imageUrl}")`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		position: 'fixed',
		inset: 0,
		zIndex: -1,
		'::before': {
			content: '""',
			position: 'absolute',
			inset: 0,
			backgroundColor: colors.backgroundBody,
			border: `6px solid ${colors.borderBody}`,
		},
	}),
});

export const Background = () => {
	return <div {...stylex.props(styles.base(BackgroundImage))} />;
};
