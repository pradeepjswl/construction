import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: [true, 'Task must be assigned to a worker'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  category: {
    type: String,
    enum: ['excavation', 'foundation', 'electrical', 'plumbing', 'masonry', 'finishing', 'hvac', 'painting', 'other'],
    required: [true, 'Task category is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'on-hold', 'cancelled'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  estimatedHours: {
    type: Number,
    required: [true, 'Estimated hours are required'],
  },
  actualHours: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  location: String,
  dependencies: [mongoose.Schema.Types.ObjectId],
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
export default Task; // Added for safety