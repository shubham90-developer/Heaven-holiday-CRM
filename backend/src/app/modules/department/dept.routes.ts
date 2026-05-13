// department.routes.ts
import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  updateDepartmentById,
} from './dept.controller';

const router = Router();

router.post('/', createDepartment);
router.get('/', getAllDepartments);
router.put('/:id', updateDepartmentById);

export const deptRouter = router;
