import { useSearchParams } from 'react-router';
import Select from './Select';
//---

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sortBy') || '';
	function handleChange(e) {
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			onChange={handleChange}
			value={sortBy}
			options={options}
			type="white"
		/>
	);
}

export default SortBy;
