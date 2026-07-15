import { Router } from 'express';
import {
  createPet,
  deletePet,
  getAllPets,
  getPetByID,
  getPetByName,
  updatePet,
} from '../services/petService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json(await getAllPets());
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    const petName = req.params.name;
    const pet = await getPetByName(petName);
    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await getPetByID(petId);
    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const pet = req.body;
    const newPet = await createPet(pet);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const data = req.body;
    const petUpdated = await updatePet(petId, data);
    res.status(200).json(petUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    await deletePet(petId);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
