import { Router } from 'express';
import {
  createFollowUp,
  getAllFollowUps,
  getFollowUpsByLead,
  updateFollowUp,
  markComplete,
} from './followUp.controller';

const router = Router();

router.get('/lead/:leadId', getFollowUpsByLead);
router.get('/', getAllFollowUps);
router.post('/', createFollowUp);
router.patch('/:id', updateFollowUp);
router.patch('/:id/complete', markComplete);

export const followupRouter = router;
