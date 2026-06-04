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

`/src/styles/GlobalStyles.js`:

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

## 3. Style a Component from outside of the Application:

```js
import { NavLink } from 'react-router';

const StyledNavLink = styled(NavLink)`
	// CSS Styles
`;
```

# Get Started with Supabase :

- ## 1. Create a new project from <strong>[supabase](https://supabase.com)</strong> account.

- ## 2.Create tables template with Table Editor from sidebar.

- ## 3.Add a sample table row for each table with `Insert` tab.

- ## 4.Create a Policy for each table from : Authentication -> Configuration -> Policies

- ## 5.Open Docs for each table from : Integration -> Installed -> Data API -> Docs

---

# I local project:

- ## 1. Installation : `npm i @supabase/supabase-js`
- ## 2. Create supabase client in `services/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
```

- ## 3. Use supabase client to request data (GET):

```js
import supabase from './supabase';

export async function getRows() {
	// *(star) means all rows
	const { data, error } = await supabase
		.from('<tableName>')
		.select('<rowName>');
	if (error) {
		console.error(error);
		throw new Error('Table could not get loaded!');
	}
	return data;
}
```

# Get started with React Query:

installation : `npm i @tanstack/react-query` , `npm i -D @tanstack/eslint-plugin-query` , `npm i @tanstack/react-query-devtools`

- ## 1. Setting up React Query:

```js
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { getTodos, postTodo } from '../my-api';

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<Todos />
		</QueryClientProvider>
	);
}

function Todos() {
	// Access the client
	const queryClient = useQueryClient();

	// Queries
	const query = useQuery({ queryKey: ['todos'], queryFn: getTodos });

	// Mutations
	const mutation = useMutation({
		mutationFn: postTodo,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return (
		<div>
			<ul>
				{query.data?.map(todo => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>

			<button
				onClick={() => {
					mutation.mutate({
						id: Date.now(),
						title: 'Do Laundry',
					});
				}}
			>
				Add Todo
			</button>
		</div>
	);
}

render(<App />, document.getElementById('root'));
```

## 2. Setting up React Query Devtools:

```js
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* The rest of your application */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
```
