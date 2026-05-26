import express from 'express';
import { getTermsConditions, updateTermsConditions } from './t&c.controller';

const router = express.Router();

router.get('/', getTermsConditions);
router.patch('/', updateTermsConditions);

export const termsConditionsRouter = router;
