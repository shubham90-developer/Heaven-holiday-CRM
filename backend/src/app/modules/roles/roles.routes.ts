import { Router } from 'express';
import { createRole, getAllRoles, updateRoleById } from './roles.controller';

const router = Router();

router.post('/', createRole);
router.get('/', getAllRoles);
router.patch('/:id', updateRoleById);

export const roleRouter = router;
