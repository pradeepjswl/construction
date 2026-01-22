import { Attendance } from '../models/Attendance.js';

export const recordAttendance = async (req, res) => {
  try {
    const { workerId, date, checkInTime, checkOutTime, status, notes, taskId, creator } = req.body;

    let hoursWorked = 0;
    if (checkInTime && checkOutTime) {
      hoursWorked = (new Date(checkOutTime) - new Date(checkInTime)) / (1000 * 60 * 60);
    }

    const attendance = new Attendance({
      workerId,
      date,
      checkInTime,
      checkOutTime,
      hoursWorked,
      status,
      notes,
      taskId,
      creator,
    });

    await attendance.save();
    await attendance.populate('workerId', 'name email phone');
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { workerId, startDate, endDate, status } = req.query;
    const filter = {};

    if (workerId) filter.workerId = workerId;
    if (status) filter.status = status;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(filter)
      .populate('workerId', 'name email phone')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('workerId', 'name email phone');

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { checkInTime, checkOutTime, status, notes } = req.body;

    let hoursWorked = 0;
    if (checkInTime && checkOutTime) {
      hoursWorked = (new Date(checkOutTime) - new Date(checkInTime)) / (1000 * 60 * 60);
    }

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      {
        checkInTime,
        checkOutTime,
        hoursWorked,
        status,
        notes,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate('workerId', 'name email phone');

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkerAttendance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { workerId: req.params.workerId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
