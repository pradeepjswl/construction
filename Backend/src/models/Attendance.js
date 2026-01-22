import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: [true, 'Worker ID is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  checkInTime: Date,
  checkOutTime: Date,
  hoursWorked: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'half-day', 'leave', 'late'],
    default: 'absent',
  },
  notes: String,
  taskId: mongoose.Schema.Types.ObjectId,
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

// Index for efficient queries by date range and worker
attendanceSchema.index({ workerId: 1, date: 1 });
attendanceSchema.index({ date: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
