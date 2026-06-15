import supabase from './supabase';
//---

export async function login(credential) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: credential.email,
		password: credential.password,
	});

	if (error) {
		console.error(error.message);
		throw new Error(error.message);
	}

	return data;
}
