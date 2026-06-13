import { useSearchParams } from 'react-router';

import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
//---

function CabinTable() {
	const [searchParams] = useSearchParams();
	const currentFilter = searchParams.get('discount') || 'all';
	const { cabins, isLoading } = useCabins();

	let filteredCabins;
	if (currentFilter === 'all') filteredCabins = cabins;
	if (currentFilter === 'no-discount')
		filteredCabins = cabins.filter(cabin => cabin.discount === 0);
	if (currentFilter === 'with-discount')
		filteredCabins = cabins.filter(cabin => cabin.discount > 0);

	const sortBy = searchParams.get('sortBy') || 'startDate-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins?.sort(
		(a, b) => (+a[field] - +b[field]) * modifier,
	);

	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName={'cabins'} />;

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedCabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
