import { Router } from 'express';
import {
	getAddresses, getAddressById, createAddress, updateAddress, deleteAddress
} from '../controllers/addressesController';

const router = Router();
router.get('/', getAddresses);
router.get('/:id', getAddressById as any);
router.post('/', createAddress);
router.put('/:id', updateAddress as any);
router.delete('/:id', deleteAddress as any);
export default router;
