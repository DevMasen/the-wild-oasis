import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';
//---

export function useCheckin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: 'true',
				...breakfast,
			}),
		onSuccess: data => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true });
			navigate('/');
		},
		onError: err => toast.error(err.message),
	});

	return { checkin, isCheckingIn };
}
