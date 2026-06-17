import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login as loginApi } from '../../services/apiAuth';
//---
export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: data => {
			queryClient.setQueryData(['user'], data.user);
			toast.success('Successfully logged in');
			navigate('/dashboard', { replace: true });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { login, isLoggingIn };
}
