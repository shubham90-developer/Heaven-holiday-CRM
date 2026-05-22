import { Router } from 'express';
import {
  createSightseeing,
  getAllSightseeings,
  getSightseeingById,
  updateSightseeing,
  deleteSightseeing,
} from './sightseeing.controller';
import { upload } from '../../config/cloudinary';
const router = Router();

router.post('/', upload.single('image'), createSightseeing);

router.get('/', getAllSightseeings);

router.get('/:id', getSightseeingById);

router.patch('/:id', upload.single('image'), updateSightseeing);

router.delete('/:id', deleteSightseeing);

export const sightSeeingRouter = router;
