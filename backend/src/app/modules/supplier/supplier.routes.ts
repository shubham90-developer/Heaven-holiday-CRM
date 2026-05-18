import { Router } from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  addContact,
  removeContact,
  addBankDetail,
  removeBankDetail,
} from './supplier.controller';

const router = Router();

router.get('/', getAllSuppliers);
router.post('/', createSupplier);
router.get('/:id', getSupplierById);
router.patch('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

router.post('/:id/contacts', addContact);
router.delete('/:id/contacts/:contactId', removeContact);

router.post('/:id/bank-details', addBankDetail);
router.delete('/:id/bank-details/:bankId', removeBankDetail);

export const supplierRouter = router;
