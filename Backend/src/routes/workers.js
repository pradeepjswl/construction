import express from 'express';
import {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
  searchWorkers
} from '../controllers/workerController.js';

const router = express.Router();

// 1. Standard Routes (Base URL: /api/workers)
router.route('/')
  .post(createWorker)
  .get(getWorkers);

// 2. Search Route (MUST be before /:id)
router.get('/search', searchWorkers);

// 3. ID-Specific Routes
router.route('/:id')
  .get(getWorkerById)
  .put(updateWorker)
  .delete(deleteWorker);

export default router;