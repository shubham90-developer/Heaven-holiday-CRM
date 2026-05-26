import { Router } from 'express';
import {
  createLeadSource,
  getAllLeadSources,
  getLeadSourceById,
  updateLeadSource,
  deleteLeadSource,
} from './lead.controller';

const router = Router();

router.post('/', createLeadSource);
router.get('/', getAllLeadSources);
router.get('/:id', getLeadSourceById);
router.patch('/:id', updateLeadSource);
router.delete('/:id', deleteLeadSource);

export const leadSourcesRouter = router;
