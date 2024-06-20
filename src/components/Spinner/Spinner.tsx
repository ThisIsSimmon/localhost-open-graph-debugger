import { colors } from '@/stylex/tokens.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
	base: {
		color: colors.text,
	},
});

type Props = {
	size: number;
};

export const Spinner = ({ size = 20 }: Props): JSX.Element => {
	const strokeWidth = size / 14;
	const r = size / 2.52631579;
	const cx = size / 2;
	const cy = size / 2;
	const strokeDashArray = `0 ${size * 6.25}`;
	const strokeDashOffset = 0;
	const strokeDashArray1 = `${size * 1.75} ${size * 6.25}`;
	const strokeDashOffset1 = `-${size / 1.5}`;
	const strokeDashArray2 = `${size * 1.75} ${size * 6.25}`;
	const strokeDashOffset2 = `-${size * 2.45833333}`;
	return (
		<>
			<svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...stylex.props(styles.base)}>
				<title>Spinner</title>
				<style>{`
                @keyframes spinnerOuter {
                    100%{
                        rotate: 360deg
                    }
                }
                @keyframes spinnerInner {
                    0%{
                        stroke-dasharray:${strokeDashArray};stroke-dashoffset:${strokeDashOffset};
                    }
                    47.5%{
                        stroke-dasharray:${strokeDashArray1};stroke-dashoffset:${strokeDashOffset1};
                    }
                    95%,100%{
                        stroke-dasharray:${strokeDashArray2};stroke-dashoffset:${strokeDashOffset2};
                    }
                }
                `}</style>
				<g
					style={{
						transformOrigin: 'center',
						animation: 'spinnerOuter 2s linear infinite',
					}}
				>
					<circle
						cx={cx}
						cy={cy}
						r={r}
						fill='none'
						strokeWidth={strokeWidth}
						style={{
							strokeLinecap: 'round',
							animation: 'spinnerInner 1.5s ease-in-out infinite',
						}}
					/>
				</g>
			</svg>
		</>
	);
};
