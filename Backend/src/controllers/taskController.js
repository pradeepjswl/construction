import { Task } from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, category, status, dueDate, estimatedHours, location, creator } = req.body;

    const task = new Task({
      title,
      description,
      assignedTo,
      priority,
      category,
      status,
      dueDate,
      estimatedHours,
      location,
      creator,
    });

    await task.save();
    await task.populate('assignedTo', 'name email phone skills');
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, category, assignedTo } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email phone')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email phone skills');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, category, status, dueDate, estimatedHours, actualHours, progress, location } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        assignedTo,
        priority,
        category,
        status,
        dueDate,
        estimatedHours,
        actualHours,
        progress,
        location,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email phone');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasksByWorker = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.workerId })
      .populate('assignedTo', 'name email phone')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
