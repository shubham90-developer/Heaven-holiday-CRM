import { Router } from 'express';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  bulkAssignLeads,
  bulkArchiveLeads,
  getLeadCounts,
} from './lead.controller';

const router = Router();

router.get('/counts', getLeadCounts);
router.patch('/bulk-assign', bulkAssignLeads);
router.patch('/bulk-archive', bulkArchiveLeads);

router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.patch('/:id', updateLead);

export const leadRouter = router;
