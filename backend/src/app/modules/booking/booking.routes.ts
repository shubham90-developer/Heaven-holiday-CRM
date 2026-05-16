import { Router } from 'express';
import {
  getAllBookings,
  getBookingById,
  updateBooking,
} from './booking.controller';

const router = Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id', updateBooking);

export const bookingRouter = router;
