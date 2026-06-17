import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCurrentUser } from '../../services/apiAuth';
//---

export function useUpdateUser() {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success('User data updated successfully');
			queryClient.invalidateQueries({ queryKey: ['user'] });
			queryClient.setQueryData(['user'], user);
		},
		onError: err => {
			toast.error(err.message);
		},
	});
	return { updateUser, isUpdating };
}
