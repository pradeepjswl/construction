import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Worker name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
  },
  email: {
    type: String,
    sparse: true,
  },
  skills: {
    type: [String],
    required: [true, 'At least one skill is required'],
  },
  proficiencyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active',
  },
  address: String,
  emergencyContact: String,
  hourlyRate: {
    type: Number,
    default: 0,
  },
  totalHoursWorked: {
    type: Number,
    default: 0,
  },
  // OPTIONAL: If 'creator' refers to a User ID, ObjectId is better than String
  creator: {
    type: String, // You can change this to mongoose.Schema.Types.ObjectId if needed
    required: true,
  },
  creatorEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Export as a named export
export const Worker = mongoose.model('Worker', workerSchema);

// Export as a default export (SAFETY NET for different import styles)
export default Worker;