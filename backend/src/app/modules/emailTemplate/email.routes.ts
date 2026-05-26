import { Router } from 'express';
import {
  createEmailTemplate,
  getAllEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate,
  toggleEmailTemplateStatus,
} from './email.controller';

const router = Router();

// POST   /v1/api/email-templates
router.post('/', createEmailTemplate);

// GET    /v1/api/email-templates
router.get('/', getAllEmailTemplates);

// GET    /v1/api/email-templates/:id
router.get('/:id', getEmailTemplateById);

// PATCH  /v1/api/email-templates/:id
router.patch('/:id', updateEmailTemplate);

// PATCH  /v1/api/email-templates/:id/status  — toggle active ↔ deactive
router.patch('/:id/status', toggleEmailTemplateStatus);

// DELETE /v1/api/email-templates/:id
router.delete('/:id', deleteEmailTemplate);

export const emailTemplateRouter = router;
