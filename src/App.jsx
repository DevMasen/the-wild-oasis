import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const StyledApp = styled.div`
	padding: 1rem;
	height: 100dvh;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Button onClick={() => alert('Checked In')}>Check in</Button>
				<Button onClick={() => alert('Checked Out')}>Check out</Button>
				<Input defaultValue={26} type="number" />
			</StyledApp>
		</>
	);
}

export default App;
