import supabase, { supabaseUrl } from './supabase';
//---

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		console.error(error.message);
		throw new Error('Cabins could not get loaded');
	}
	return data;
}

export async function deleteCabin(id = '') {
	const { error } = await supabase
		.from('cabins')
		.delete()
		.eq('id', id + '');
	if (error) {
		console.error(error.message);
		throw new Error('Cabin could not be deleted');
	}
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName =
		`${Math.floor(Math.random() * 1000000)}-${newCabin.image.name}`.replaceAll(
			'/',
			'',
		);

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = await supabase.from('cabins');

	// Create Cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// Edit Cabin
	if (id)
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error.message);
		throw new Error('Cabin could not be created');
	}

	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError.message);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created',
		);
	}

	return data;
}
