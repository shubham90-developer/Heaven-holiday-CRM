import { Router } from 'express';
import {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
} from './area.controller';

const router = Router();

// POST   /v1/api/areas
router.post('/', createArea);

// GET    /v1/api/areas
router.get('/', getAllAreas);

// GET    /v1/api/areas/:id
router.get('/:id', getAreaById);

// PATCH  /v1/api/areas/:id
router.patch('/:id', updateArea);

// DELETE /v1/api/areas/:id  (soft delete)
router.delete('/:id', deleteArea);

export const areaRouter = router;
