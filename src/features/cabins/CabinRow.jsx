import styled from 'styled-components';

import { HiPencil, HiTrash } from 'react-icons/hi';
import { HiSquare2Stack } from 'react-icons/hi2';

import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import { formatCurrency } from '../../utils/helpers';
import Table from '../../ui/Table';
// import Menus from '../../ui/Menus';
//---

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const {
		id,
		name,
		maxCapacity,
		regularPrice,
		discount,
		description,
		image,
	} = cabin;

	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			image,
		});
	}

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin> {name} </Cabin>
			<div>
				<strong>Fits up to {maxCapacity} guests</strong>
			</div>
			<Price> {formatCurrency(regularPrice)} </Price>
			{discount ? (
				<Discount> {formatCurrency(discount)} </Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<button onClick={handleDuplicate} disabled={isCreating}>
					<HiSquare2Stack />
				</button>

				<Modal>
					<Modal.Open opens="edit">
						<button>
							<HiPencil />
						</button>
					</Modal.Open>
					<Modal.Window name="edit">
						<CreateCabinForm editedCabin={cabin} />
					</Modal.Window>

					<Modal.Open opens="confirm-delete">
						<button>
							<HiTrash />
						</button>
					</Modal.Open>
					<Modal.Window name="confirm-delete">
						<ConfirmDelete
							resourceName={'cabins'}
							onConfirm={() => deleteCabin(id)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>

				{/* <Menus.Menu></Menus.Menu> */}
			</div>
		</Table.Row>
	);
}

export default CabinRow;
