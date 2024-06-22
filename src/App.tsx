import { Background } from '@/components/Background';
import { Description } from '@/components/Description';
import { SubmitButton } from '@/components/SubmitButton';
import { Title } from '@/components/Title/Title';
import * as stylex from '@stylexjs/stylex';

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

function App() {
	return (
		<>
			<Background />
			<div {...stylex.props(styles.container)}>
				<div {...stylex.props(styles.guide)}>
					<Title />
					<Description />
				</div>
				<SubmitButton />
			</div>
		</>
	);
}

export default App;
