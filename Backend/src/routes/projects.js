import express from 'express';
// We currently only have these two functions in the controller
import { getProjects, createProject } from '../controllers/projectController.js'; 

// Import middleware (Comment this out if you haven't created the middleware file yet)
// import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Authentication Middleware ---
// (Uncomment this line once you have a working 'protect' function in middleware/auth.js)
// router.use(protect);

// --- Routes ---

// 1. Create a Project
router.post('/', createProject);

// 2. Get User's Projects
router.get('/', getProjects);

// --- FUTURE ROUTES (Uncomment these as you build the controller functions) ---

// router.get('/search', searchProjects);
// router.get('/:id', getProjectById);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);

// router.get('/:id/team', getProjectTeam);
// router.post('/:id/team/add', addTeamMember);
// router.post('/:id/team/remove', removeTeamMember);

// router.get('/:id/tasks', getProjectTasks);
// router.post('/:id/tasks/add', addTask);
// router.post('/:id/tasks/remove', removeTask);

export default router;