import { Router } from 'express';
import {
  getSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule
} from '../controllers/schedulesController';

const router = Router();
router.get('/', getSchedules);
router.get('/:id', getScheduleById as any);
router.post('/', createSchedule);
router.patch('/:id', updateSchedule as any);
router.delete('/:id', deleteSchedule as any);
export default router;
