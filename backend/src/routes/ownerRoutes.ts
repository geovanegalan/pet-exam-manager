import { Router } from 'express';
import {
  createOwner,
  getAllOwners,
  getOwnerById,
  updateOwner,
} from '../services/ownerService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json(await getAllOwners());
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const owner = await getOwnerById(userId);
    res.json(owner);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const owner = req.body;
    const newOwner = await createOwner(owner);
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const ownerUpdated = await updateOwner(userId, data);
    res.status(200).json(ownerUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
