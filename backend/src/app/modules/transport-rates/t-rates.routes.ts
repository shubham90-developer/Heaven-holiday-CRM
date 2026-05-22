import { Router } from 'express';
import {
  createTransportRoute,
  getAllTransportRoutes,
  getTransportRouteById,
  updateTransportRoute,
  deleteTransportRoute,
} from './t-rates.controller';

const router = Router();

router.post('/', createTransportRoute);
router.get('/', getAllTransportRoutes);
router.get('/:id', getTransportRouteById);
router.patch('/:id', updateTransportRoute);
router.delete('/:id', deleteTransportRoute);

export const transportRatesRouter = router;
