import express from 'express';
import {
  createGuide,
  getAllGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
} from './guide.controller';

const router = express.Router();

router.post('/', createGuide);
router.get('/', getAllGuides);
router.get('/:id', getGuideById);
router.patch('/:id', updateGuide);
router.delete('/:id', deleteGuide);

export const guideRouter = router;
