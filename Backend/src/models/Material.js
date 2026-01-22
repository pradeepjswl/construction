import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['cement', 'steel', 'bricks', 'sand', 'gravel', 'pipes', 'wiring', 'paint', 'tools', 'equipment', 'other'],
    required: [true, 'Material category is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    default: 0,
  },
  unit: {
    type: String,
    enum: ['kg', 'tons', 'liters', 'meters', 'pieces', 'bags', 'boxes', 'units'],
    required: [true, 'Unit of measurement is required'],
  },
  currentStock: {
    type: Number,
    required: [true, 'Current stock is required'],
    default: 0,
  },
  minStockLevel: {
    type: Number,
    required: [true, 'Minimum stock level is required'],
    default: 10,
  },
  maxStockLevel: {
    type: Number,
    default: 1000,
  },
  unitPrice: {
    type: Number,
    default: 0,
  },
  supplier: String,
  location: String,
  description: String,
  reorderQuantity: {
    type: Number,
    default: 50,
  },
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

export const Material = mongoose.model('Material', materialSchema);
