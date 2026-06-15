import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';

import { login as loginApi } from '../../services/apiAuth';
//---
export function useLogin() {
	const navigate = useNavigate();
	const {
		mutate: login,
		isPending: isLoggingIn,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			toast.success('User successfully logged in');
			navigate('/dashboard');
		},
		onError: err => {
			toast.error('Provided Email or Password is Incorrect');
		},
	});

	return { login, isLoggingIn, error };
}
