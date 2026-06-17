import { useQuery } from '@tanstack/react-query';

import { getSettings } from '../../services/apiSettings';
//---

export function useSettings() {
	const {
		data: settings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['setting'],
		queryFn: getSettings,
	});
	if (error) console.error(error);
	return { settings, isLoading, error };
}
