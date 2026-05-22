import { Router } from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from './resto.controller';

const router = Router();

router.route('/').get(getAllRestaurants).post(createRestaurant);

router
  .route('/:id')
  .get(getRestaurantById)
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

export const restoRouter = router;
