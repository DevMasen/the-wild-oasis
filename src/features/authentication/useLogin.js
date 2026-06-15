import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login as loginApi } from '../../services/apiAuth';
//---
export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		mutate: login,
		isPending: isLoggingIn,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: user => {
			queryClient.setQueriesData(['user'], user);
			navigate('/dashboard');
			toast.success('Successfully logged in');
		},
		onError: err => {
			toast.error('Provided Email or Password is Incorrect');
		},
	});

	return { login, isLoggingIn, error };
}
