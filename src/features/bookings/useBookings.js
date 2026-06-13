import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router';
//---

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };
	// { field: 'totalPrice', value: 5000, method: 'lte' };

	const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByValue.split('-');
	const sortBy = { field, direction };

	const { data: bookings, isLoading } = useQuery({
		queryKey: ['bookings', filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});
	return { bookings, isLoading };
}
