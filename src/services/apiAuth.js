import supabase from './supabase';
//---

export async function login(credentials) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: credentials.email,
		password: credentials.password,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
		throw new Error(error.message);
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
		console.error(error);
		throw new Error(error.message);
	}
	return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
	// 1. update fullName OR password
	let updateFields;
	if (fullName) updateFields = { data: { fullName } };
	if (password) updateFields = { password };

	const { data, error } = await supabase.auth.updateUser(updateFields);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	if (!avatar) return data;

	// 2. upload avatar to supabase
	const fileName = `avatar-${data.user.id}-${Math.floor(Math.random() * 100000)}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) {
		console.error(storageError);
		throw new Error(storageError.message);
	}

	// 3. update avatar url

	const { data: data2, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (error2) {
		console.error(error2);
		throw new Error(error2.message);
	}

	return data2;
}
