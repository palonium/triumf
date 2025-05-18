import { Router } from 'express';
import {
  getTeams, getTeamById, createTeam, updateTeam, deleteTeam
} from '../controllers/teamsController';

const router = Router();
router.get('/', getTeams);
router.get('/:id', getTeamById as any);
router.post('/', createTeam);
router.patch('/:id', updateTeam as any);
router.delete('/:id', deleteTeam as any);
export default router;
