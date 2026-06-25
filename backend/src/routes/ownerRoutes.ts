import { Router } from 'express';
import { getAllOwners } from '../services/ownerService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json(await getAllOwners());
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
