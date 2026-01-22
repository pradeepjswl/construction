import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js'; 
// Note: We are importing specific functions, not * as authController

const router = express.Router();

// Public Routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected Routes (Commented out until we create the 'protect' middleware and these controller functions)
// router.get('/me', protect, getCurrentUser);
// router.put('/profile', protect, updateProfile);
// router.post('/logout', protect, logout);

export default router;