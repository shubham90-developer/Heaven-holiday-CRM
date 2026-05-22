import express from 'express';
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from './driver.controller';

const router = express.Router();

router.post('/', createDriver);
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.patch('/:id', updateDriver);
router.delete('/:id', deleteDriver);

export const driverRouter = router;
