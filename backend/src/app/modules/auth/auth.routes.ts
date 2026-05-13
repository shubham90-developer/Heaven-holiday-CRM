import { Router } from 'express';
import { superadminLogin, staffLogin } from './auth';
const router = Router();

// public routes → no middleware needed
router.post('/superadmin/login', superadminLogin);
router.post('/staff/login', staffLogin);

export const authRouter = router;
