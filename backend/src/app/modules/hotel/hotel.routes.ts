import { Router } from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from './hotel.controller';

const router = Router();

router.post('/', createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.patch('/:id', updateHotel);
router.delete('/:id', deleteHotel);

export const hotelRouter = router;
