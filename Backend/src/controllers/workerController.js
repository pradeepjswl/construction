import { Worker } from '../models/Worker.js';

export const createWorker = async (req, res) => {
  try {
    const { name, phone, email, skills, proficiencyLevel, status, address, emergencyContact, hourlyRate, creator } = req.body;

    const worker = new Worker({
      name,
      phone,
      email,
      skills,
      proficiencyLevel,
      status,
      address,
      emergencyContact,
      hourlyRate,
      creator,
      creatorEmail: req.user?.email || email,
    });

    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWorkers = async (req, res) => {
  try {
    const { status, skills } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (skills) filter.skills = { $in: Array.isArray(skills) ? skills : [skills] };

    const workers = await Worker.find(filter).sort({ createdAt: -1 });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWorker = async (req, res) => {
  try {
    const { name, phone, email, skills, proficiencyLevel, status, address, emergencyContact, hourlyRate } = req.body;

    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email,
        skills,
        proficiencyLevel,
        status,
        address,
        emergencyContact,
        hourlyRate,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchWorkers = async (req, res) => {
  try {
    const { query } = req.query;
    const workers = await Worker.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } },
      ],
    });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
