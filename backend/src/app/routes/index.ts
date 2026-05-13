import { Router } from 'express';
import { roleRouter } from '../modules/roles/roles.routes';
import { deptRouter } from '../modules/department/dept.routes';
import { staffRouter } from '../modules/staff/staff.routes';
import { authRouter } from '../modules/auth/auth.routes';
const router = Router();
const moduleRoutes = [
  {
    path: '/roles',
    route: roleRouter,
  },
  {
    path: '/departments',
    route: deptRouter,
  },
  {
    path: '/staff',
    route: staffRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
