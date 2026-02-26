# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

# Get Started with Styled Components :

installation: `npm i styled-components`

## 1. Add styled with "styled" function:

`/src/App.jsx`:

```js
import styled from 'styled-components';

const Element = styled.element`
	// CSS styles
	margin: 30px;
	padding: 20px;
`;

const StyledApp = styled.div`
	// Styles for App Component
	padding: 30px;
	background-color: black;
`;

export default function App() {
	return (
		<StyledApp>
			<Element>Foo Baz</Element>
		</StyledApp>
	);
}
```

## 2. Add Global Styles with Styled Components:

`/src/styles/GlobalStlyes.js`:

```js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    // Global Styles CSS
`;

export default GlobalStyles;
```

---

`/src/App.jsx`:

```js
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const StyledApp = styled.div`
	// App Component Styles
`;

export default function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>// App Children</StyledApp>
		</>
	);
}
```
