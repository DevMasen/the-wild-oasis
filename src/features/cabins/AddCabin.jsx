import CreateCabinForm from './CreateCabinForm';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
//---

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="add-cabin">
				<Button> Add new Cabin </Button>
			</Modal.Open>
			<Modal.Window name="add-cabin">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}

export default AddCabin;
