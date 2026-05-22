import { Router } from 'express';
import {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
} from './itenary.controller';

const router = Router();

// POST   /v1/api/itineraries
router.post('/', createItinerary);

// GET    /v1/api/itineraries
router.get('/', getAllItineraries);

// GET    /v1/api/itineraries/:id
router.get('/:id', getItineraryById);

// PATCH  /v1/api/itineraries/:id
router.patch('/:id', updateItinerary);

// DELETE /v1/api/itineraries/:id  (soft delete)
router.delete('/:id', deleteItinerary);

export const itenaryRouter = router;
