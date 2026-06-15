import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { logout as logoutApi } from '../../services/apiAuth';
//---
export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		mutate: logout,
		isPending: isLoggingOut,
		error,
	} = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			toast.success('Successfully Logged out');
			queryClient.removeQueries();
			navigate('/login', { replace: true });
		},
		onError: () => {
			toast.error('There was an error while logging out');
		},
	});

	return { logout, isLoggingOut, error };
}
