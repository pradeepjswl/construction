import mongoose from 'mongoose';

const hazardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hazard title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Hazard description is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  category: {
    type: String,
    enum: ['electrical', 'fall', 'fire', 'chemical', 'mechanical', 'environmental', 'other'],
    required: [true, 'Category is required'],
  },
  status: {
    type: String,
    enum: ['reported', 'in-progress', 'mitigated', 'resolved'],
    default: 'reported',
  },
  affectedWorkers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
    },
  ],
  mitigationMeasures: String,
  reportedBy: {
    type: String,
    required: true,
  },
  reportedDate: {
    type: Date,
    default: Date.now,
  },
  resolvedDate: Date,
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

export const Hazard = mongoose.model('Hazard', hazardSchema);
