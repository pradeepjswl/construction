import { Hazard } from '../models/Hazard.js';

export const reportHazard = async (req, res) => {
  try {
    const { title, description, location, riskLevel, category, affectedWorkers, mitigationMeasures, reportedBy, creator } = req.body;

    const hazard = new Hazard({
      title,
      description,
      location,
      riskLevel,
      category,
      affectedWorkers,
      mitigationMeasures,
      reportedBy,
      creator,
    });

    await hazard.save();
    await hazard.populate('affectedWorkers', 'name email phone');
    res.status(201).json(hazard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getHazards = async (req, res) => {
  try {
    const { riskLevel, category, status } = req.query;
    const filter = {};

    if (riskLevel) filter.riskLevel = riskLevel;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const hazards = await Hazard.find(filter)
      .populate('affectedWorkers', 'name email phone')
      .sort({ reportedDate: -1 });

    res.json(hazards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHazardById = async (req, res) => {
  try {
    const hazard = await Hazard.findById(req.params.id)
      .populate('affectedWorkers', 'name email phone');

    if (!hazard) {
      return res.status(404).json({ error: 'Hazard not found' });
    }
    res.json(hazard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHazard = async (req, res) => {
  try {
    const { title, description, location, riskLevel, category, status, affectedWorkers, mitigationMeasures, resolvedDate } = req.body;

    const hazard = await Hazard.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        location,
        riskLevel,
        category,
        status,
        affectedWorkers,
        mitigationMeasures,
        resolvedDate: status === 'resolved' ? new Date() : resolvedDate,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate('affectedWorkers', 'name email phone');

    if (!hazard) {
      return res.status(404).json({ error: 'Hazard not found' });
    }

    res.json(hazard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHazard = async (req, res) => {
  try {
    const hazard = await Hazard.findByIdAndDelete(req.params.id);
    if (!hazard) {
      return res.status(404).json({ error: 'Hazard not found' });
    }
    res.json({ message: 'Hazard deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCriticalHazards = async (req, res) => {
  try {
    const hazards = await Hazard.find({
      riskLevel: 'critical',
      status: { $ne: 'resolved' },
    }).populate('affectedWorkers', 'name email phone');

    res.json(hazards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
