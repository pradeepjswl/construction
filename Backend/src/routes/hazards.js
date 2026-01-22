import express from 'express';
import * as hazardController from '../controllers/hazardController.js';

const router = express.Router();

router.post('/', hazardController.reportHazard);
router.get('/', hazardController.getHazards);
router.get('/critical', hazardController.getCriticalHazards);
router.get('/:id', hazardController.getHazardById);
router.put('/:id', hazardController.updateHazard);
router.delete('/:id', hazardController.deleteHazard);

export default router;
