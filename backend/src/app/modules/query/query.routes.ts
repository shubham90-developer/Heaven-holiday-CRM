// query.routes.ts
import { Router } from 'express';
import {
  createQuery,
  getAllQueries,
  getQueriesByLead,
  getQueryById,
  updateQuery,
  updateQueryStatus,
  deleteQuery,
} from './query.controller';

const router = Router();

router.post('/', createQuery);
router.get('/', getAllQueries);
router.get('/lead/:leadId', getQueriesByLead);
router.get('/:id', getQueryById);
router.put('/:id', updateQuery);
router.patch('/:id/status', updateQueryStatus);
router.delete('/:id', deleteQuery);

export const queryRouter = router;
