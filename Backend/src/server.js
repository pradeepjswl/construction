import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import authRouter from './routes/auth.js';
import workersRouter from './routes/workers.js';
import tasksRouter from './routes/tasks.js';
import materialsRouter from './routes/materials.js';
import attendanceRouter from './routes/attendance.js';
import hazardsRouter from './routes/hazards.js';
import dashboardRouter from './routes/dashboard.js';
import projectsRouter from './routes/projects.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS configuration
const corsOptions = {
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175').split(','),
  credentials: true,
};
app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    mongodb: 'Connected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/workers', workersRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/hazards', hazardsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/projects', projectsRouter);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 SiteSyncAI Backend Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ MongoDB: Connected`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
