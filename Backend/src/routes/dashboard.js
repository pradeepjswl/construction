import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getProjectManagerStats,
  getSiteManagerStats,
  getRecentActivity,
  getProjectWithDetails,
  getProjectsByStatus,
  getBudgetOverview,
  getWorkerStats,
  getTaskStats,
  getMaterialStats,
  getAttendanceStats
} from '../controllers/dashboardController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Project Manager Dashboard
router.get('/project-manager/stats', getProjectManagerStats);
router.get('/project-manager/budget', getBudgetOverview);
router.get('/project-manager/projects/:status?', getProjectsByStatus);

// Site Manager Dashboard
router.get('/site-manager/stats', getSiteManagerStats);

// Common endpoints
router.get('/activity', getRecentActivity);
router.get('/project/:id', getProjectWithDetails);

// Statistics endpoints
router.get('/stats/workers', getWorkerStats);
router.get('/stats/tasks', getTaskStats);
router.get('/stats/materials', getMaterialStats);
router.get('/stats/attendance', getAttendanceStats);

export default router;
