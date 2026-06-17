import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getBooking } from '../../services/apiBookings';
//---

export function useBooking() {
	const { bookingId } = useParams();
	const {
		data: booking,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});
	if (error) console.error(error);
	return { booking, isLoading, error };
}
