import { Router } from 'express';
import {
  createVisa,
  getAllVisas,
  getVisaById,
  updateVisa,
  deleteVisa,
} from './visa.controller';

const router = Router();

// POST   /v1/api/visas
router.post('/', createVisa);

// GET    /v1/api/visas
router.get('/', getAllVisas);

// GET    /v1/api/visas/:id
router.get('/:id', getVisaById);

// PATCH  /v1/api/visas/:id
router.patch('/:id', updateVisa);

// DELETE /v1/api/visas/:id
router.delete('/:id', deleteVisa);

export const visaRouter = router;
