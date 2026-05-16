import { Router } from 'express';
import {
  createProposal,
  getProposalsByQuery,
  updateProposal,
  sendProposal,
  acceptProposal,
  rejectProposal,
} from './proposal.controller';

const router = Router();

router.get('/query/:queryId', getProposalsByQuery);
router.post('/', createProposal);
router.patch('/:id', updateProposal);
router.patch('/:id/send', sendProposal);
router.patch('/:id/accept', acceptProposal);
router.patch('/:id/reject', rejectProposal);

export const proposalRouter = router;
