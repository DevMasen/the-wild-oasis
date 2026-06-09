import { useForm } from 'react-hook-form';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
//---

function CreateCabinForm({ editedCabin = {}, onCloseModal }) {
	const { id: editId, ...editValues } = editedCabin;
	const isEditForm = Boolean(editId);

	const { register, handleSubmit, getValues, reset, formState } = useForm({
		defaultValues: isEditForm ? editValues : {},
	});
	const { errors } = formState;

	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();
	const isWorking = isEditing || isCreating;

	function onSubmit(data) {
		const image =
			typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditForm)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						onCloseModal?.();
						reset();
					},
				},
			);
		else
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => {
						onCloseModal?.();
						reset();
					},
				},
			);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register('name', {
						required: 'This Field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This Field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This Field is required',
						min: {
							value: 1,
							message: 'Regular Price should be at least 1$',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This Field is required',
						validate: value =>
							+value <= +getValues().regularPrice ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register('description', {
						required: 'This Field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register('image', {
						required: isEditForm ? false : 'This Field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditForm ? 'Edit Cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
