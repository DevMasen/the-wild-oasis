import styled from 'styled-components';

const H1 = styled.h1`
	font-size: 72px;
	font-weight: 600;
	color: #777;
`;

const Button = styled.button`
	margin: 3rem;
	padding: 2rem 5rem;
	border: none;
	outline: none;
	background-color: purple;
	color: red;
	border-radius: 5px;
	cursor: pointer;
`;

const Input = styled.input`
	border: none;
	outline: none;
	padding: 1rem;
	margin: 2rem;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

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
		<StyledApp>
			<H1>Hello, Masein</H1>
			<Button onClick={() => alert('Checked In')}>Check in</Button>
			<Button onClick={() => alert('Checked Out')}>Check out</Button>
			<Input defaultValue={26} type="number" />
		</StyledApp>
	);
}

export default App;
