import express from 'express';
import {
  createSightseeingRate,
  getAllSightseeingRates,
  getSightseeingRateById,
  updateSightseeingRate,
  deleteSightseeingRate,
  getSightseeingCities,
  getSightseeingsByCity,
} from './rates.controller';

const router = express.Router();

router.get('/cities', getSightseeingCities);
router.get('/by-city', getSightseeingsByCity);

router.post('/', createSightseeingRate);
router.get('/', getAllSightseeingRates);
router.get('/:id', getSightseeingRateById);
router.patch('/:id', updateSightseeingRate);
router.delete('/:id', deleteSightseeingRate);

export const rateRouter = router;
