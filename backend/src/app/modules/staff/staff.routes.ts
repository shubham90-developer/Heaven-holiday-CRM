// backend/src/app/modules/staff/staff.routes.ts
//
// FIX: Uncomment the authenticate + authorizeRoles middleware.
// Without this, ANY request (even unauthenticated ones) can hit these endpoints.
//
import { Router } from 'express';
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  updateStaffFlags,
} from './staff.controller';
import { authenticate, authorizeRoles } from '../auth/auth';

const router = Router();

// All staff management routes require: valid JWT + superadmin role
router.use(authenticate, authorizeRoles('superadmin'));

router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.put('/:id', updateStaffById);
router.patch('/:id/flags', updateStaffFlags);

export const staffRouter = router;
