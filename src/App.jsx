import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
	padding: 1rem;
	height: 100dvh;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						<Heading as="h1">The Wild Oasis</Heading>
						<div>
							<Heading as="h2">Check in and out</Heading>
							<Button onClick={() => alert('Checked In')}>
								Check in
							</Button>
							<Button
								size="small"
								variation="danger"
								onClick={() => alert('Checked Out')}
							>
								Check out
							</Button>
						</div>
					</Row>

					<Row>
						<Heading as="h3">Form</Heading>
						<form>
							<Input type="number" />
							<Input type="text" />
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
