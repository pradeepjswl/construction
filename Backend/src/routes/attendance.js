import express from 'express';
import * as attendanceController from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', attendanceController.recordAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/worker/:workerId', attendanceController.getWorkerAttendance);
router.get('/:id', attendanceController.getAttendanceById);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

export default router;
