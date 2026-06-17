import supabase from './supabase';
//---

export async function login(credentials) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: credentials.email,
		password: credentials.password,
	});

	if (error) {
		console.error(error.message);
		throw new Error('Auth : Login Failed');
	}

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error(error.message);
		throw new Error('Auth: Could not load user session');
	}

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error.message);
		throw new Error('Auth: Logout Failed');
	}
}

export async function signup({ email, password, fullName }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});
	if (error) {
		console.error(error.message);
		throw new Error('Auth: Could not create new account');
	}
	return data;
}
