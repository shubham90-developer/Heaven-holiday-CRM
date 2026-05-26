import express from 'express';
import {
  getCompanyProfile,
  updateCompanyProfile,
  addBankDetail,
  updateBankDetail,
  deleteBankDetail,
} from './company.controller';

const router = express.Router();

// Static bank-details routes FIRST (before any /:id)
router.post('/bank-details', addBankDetail);
router.patch('/bank-details/:bankId', updateBankDetail);
router.delete('/bank-details/:bankId', deleteBankDetail);

router.get('/', getCompanyProfile);
router.patch('/', updateCompanyProfile);

export const companyProfileRouter = router;
