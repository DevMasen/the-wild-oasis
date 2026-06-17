import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { signup as signupApi } from '../../services/apiAuth';
//---
export function useSignup() {
	const { mutate: signup, isPending: isSigningUp } = useMutation({
		mutationFn: signupApi,
		onSuccess: user => {
			console.log(user);
			toast.success(
				"New account created successfully. Please verify the new account from the user's email address",
			);
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { signup, isSigningUp };
}
