// staff.routes.ts
import { Router } from 'express';
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  updateStaffFlags,
} from './staff.controller';

const router = Router();

router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.put('/:id', updateStaffById);
router.patch('/:id/flags', updateStaffFlags);

export const staffRouter = router;

// staff.routes.ts
// import { Router } from 'express';
// import {
//   createStaff,
//   getAllStaff,
//   getStaffById,
//   updateStaffById,
//   updateStaffFlags,
// } from './staff.controller';
// import { authenticate, authorizeRoles } from '../auth/auth';
// const router = Router();

// router.use(authenticate, authorizeRoles('superadmin'));

// router.post('/', createStaff);
// router.get('/', getAllStaff);
// router.get('/:id', getStaffById);
// router.put('/:id', updateStaffById);
// router.patch('/:id/flags', updateStaffFlags);

// export const staffRouter = router;
