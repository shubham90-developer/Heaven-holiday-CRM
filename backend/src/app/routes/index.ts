import { Router } from 'express';
import { roleRouter } from '../modules/roles/roles.routes';
import { deptRouter } from '../modules/department/dept.routes';
import { staffRouter } from '../modules/staff/staff.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { leadRouter } from '../modules/lead/lead.routes';
import { queryRouter } from '../modules/query/query.routes';
import { proposalRouter } from '../modules/proposal/proposal.routes';
import { followupRouter } from '../modules/followUp/followUp.routes';
import { bookingRouter } from '../modules/booking/booking.routes';
import { supplierRouter } from '../modules/supplier/supplier.routes';
const router = Router();

const moduleRoutes = [
  { path: '/roles', route: roleRouter },
  { path: '/departments', route: deptRouter },
  { path: '/staff', route: staffRouter },
  { path: '/auth', route: authRouter },
  { path: '/leads', route: leadRouter },
  { path: '/queries', route: queryRouter },
  { path: '/proposals', route: proposalRouter },
  { path: '/followups', route: followupRouter },
  { path: '/bookings', route: bookingRouter },
  { path: '/suppliers', route: supplierRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
