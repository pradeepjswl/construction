import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  location: {
    type: String,
    required: [true, 'Project location is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    default: 0,
  },
  spentAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'on-hold', 'completed', 'cancelled'],
    default: 'planning',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project manager is required'],
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
    },
  ],
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  attachments: [String],
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

export const Project = mongoose.model('Project', projectSchema);
