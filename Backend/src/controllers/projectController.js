import Project from '../models/Project.js';
import Worker from '../models/Worker.js';
import Task from '../models/Task.js';

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { name, location, budget, status } = req.body;

    // Basic validation
    if (!name || !location) {
      return res.status(400).json({ error: 'Please provide project name and location' });
    }

    const project = await Project.create({
      name,
      location,
      budget: budget || 0,
      status: status || 'planning',
      // We will add the creator/manager logic later when Auth is fully integrated
      // manager: req.user._id 
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Search projects
// @route   GET /api/projects/search
export const searchProjects = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const projects = await Project.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- TEAM FUNCTIONS ---

export const getProjectTeam = async (req, res) => {
    // Placeholder until we implement full team logic
    res.json({ message: "Get Team not implemented yet" });
};

export const addTeamMember = async (req, res) => {
    res.json({ message: "Add Member not implemented yet" });
};

export const removeTeamMember = async (req, res) => {
    res.json({ message: "Remove Member not implemented yet" });
};

// --- TASK FUNCTIONS ---

export const getProjectTasks = async (req, res) => {
    res.json({ message: "Get Tasks not implemented yet" });
};

export const addTask = async (req, res) => {
    res.json({ message: "Add Task not implemented yet" });
};

export const removeTask = async (req, res) => {
    res.json({ message: "Remove Task not implemented yet" });
};