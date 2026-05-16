import { Router } from 'express';
import {
  createQuery,
  getAllQueries,
  getQueriesByLead,
  getQueryById,
  updateQuery,
  getQueryCounts,
} from './query.controller';

const router = Router();

router.get('/counts', getQueryCounts);
router.get('/lead/:leadId', getQueriesByLead);
router.get('/', getAllQueries);
router.get('/:id', getQueryById);
router.post('/', createQuery);
router.patch('/:id', updateQuery);

export const queryRouter = router;
