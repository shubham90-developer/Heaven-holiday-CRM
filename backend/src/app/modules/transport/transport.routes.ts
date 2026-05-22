import express from 'express';
import {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransport,
  deleteTransport,
} from './transport.controller';

const router = express.Router();

router.post('/', createTransport);
router.get('/', getAllTransports);
router.get('/:id', getTransportById);
router.patch('/:id', updateTransport);
router.delete('/:id', deleteTransport);

export const transportRouter = router;
