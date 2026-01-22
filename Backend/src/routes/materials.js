import express from 'express';
import * as materialController from '../controllers/materialController.js';

const router = express.Router();

router.post('/', materialController.createMaterial);
router.get('/', materialController.getMaterials);
router.get('/low-stock', materialController.getLowStockMaterials);
router.get('/:id', materialController.getMaterialById);
router.put('/:id', materialController.updateMaterial);
router.patch('/:id/stock', materialController.updateMaterialStock);
router.delete('/:id', materialController.deleteMaterial);

export default router;
