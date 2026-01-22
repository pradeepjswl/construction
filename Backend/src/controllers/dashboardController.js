import { Worker } from '../models/Worker.js';
import { Task } from '../models/Task.js';
import { Material } from '../models/Material.js';
import { Attendance } from '../models/Attendance.js';
import { Hazard } from '../models/Hazard.js';
import { Project } from '../models/Project.js';

// Project Manager Dashboard Stats
export const getProjectManagerStats = async (req, res) => {
  try {
    const projects = await Project.find().lean();
    const workers = await Worker.find().lean();
    const tasks = await Task.find().lean();

    const activeProjects = projects.filter(p => p.status === 'in-progress');
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const spentAmount = projects.reduce((sum, p) => sum + (p.spentAmount || 0), 0);
    const activeWorkers = workers.filter(w => w.status === 'active');
    const pendingTasks = tasks.filter(t => t.status === 'pending');

    res.json({
      activeProjects: activeProjects.length,
      totalBudget,
      totalSpent: spentAmount,
      remaining: totalBudget - spentAmount,
      activeWorkers: activeWorkers.length,
      totalWorkers: workers.length,
      pendingTasks: pendingTasks.length,
      totalTasks: tasks.length,
      attendanceRate: ((activeWorkers.length / (workers.length || 1)) * 100).toFixed(1),
      projectsData: projects.map(p => ({
        _id: p._id,
        name: p.name,
        progress: p.progress || 0,
        status: p.status,
        spent: p.spentAmount || 0,
        budget: p.budget || 0,
        location: p.location
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Site Manager Dashboard Stats
export const getSiteManagerStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [workers, tasks, materials, hazards, attendance] = await Promise.all([
      Worker.find({ status: 'active' }).lean(),
      Task.find().lean(),
      Material.find().lean(),
      Hazard.find({ status: 'open' }).lean(),
      Attendance.find({ date: today }).lean()
    ]);

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalMaterialStock = materials.length > 0
      ? Math.round(materials.reduce((sum, m) => sum + ((m.currentStock / (m.maxStockLevel || 100)) * 100), 0) / materials.length)
      : 0;

    res.json({
      workersPresent: attendance.length,
      totalWorkers: workers.length,
      workersAbsent: workers.length - attendance.length,
      tasksCompleted: completedTasks,
      totalTasks: tasks.length,
      tasksInProgress: tasks.filter(t => t.status === 'in-progress').length,
      tasksPending: tasks.filter(t => t.status === 'pending').length,
      materialsStock: Math.min(totalMaterialStock, 100),
      safetyAlerts: hazards.length,
      attendancePercentage: ((attendance.length / (workers.length || 1)) * 100).toFixed(1)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Recent Activity
export const getRecentActivity = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    // Get recent attendance entries (check-ins)
    const recentAttendance = await Attendance.find()
      .select('workerId workerName date checkInTime status')
      .sort({ checkInTime: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Get recent tasks
    const recentTasks = await Task.find()
      .select('title status progress dueDate')
      .sort({ updatedAt: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Get recent hazards
    const recentHazards = await Hazard.find()
      .select('title riskLevel status reportedDate')
      .sort({ reportedDate: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Combine and format
    const activities = [];

    recentAttendance.forEach(a => {
      activities.push({
        time: new Date(a.checkInTime).toLocaleTimeString('en-IN'),
        action: 'Worker Check-in',
        detail: `${a.workerName} clocked in`,
        status: 'success',
        type: 'attendance'
      });
    });

    recentTasks.forEach(t => {
      activities.push({
        time: new Date(t.updatedAt || t.dueDate).toLocaleTimeString('en-IN'),
        action: 'Task Updated',
        detail: `${t.title} - ${t.status}`,
        status: t.status === 'completed' ? 'success' : 'info',
        type: 'task'
      });
    });

    recentHazards.forEach(h => {
      activities.push({
        time: new Date(h.reportedDate).toLocaleTimeString('en-IN'),
        action: 'Safety Alert',
        detail: `${h.title} - ${h.riskLevel} risk`,
        status: h.riskLevel === 'critical' ? 'warning' : 'info',
        type: 'hazard'
      });
    });

    // Sort by time (most recent first)
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({
      activities: activities.slice(0, limit),
      count: activities.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Project Details with related data
export const getProjectWithDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('projectManager', 'name email phone')
      .populate('supervisor', 'name email phone')
      .populate('teamMembers', 'name phone skills status')
      .populate('materials', 'name quantity unit currentStock')
      .populate('tasks', 'title status progress priority')
      .lean();

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Get all tasks for this project
    const tasks = await Task.find({ _id: { $in: project.tasks || [] } }).lean();
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;

    res.json({
      ...project,
      taskStats: {
        total: totalTasks,
        completed: completedTasks,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        pending: tasks.filter(t => t.status === 'pending').length
      },
      budgetStats: {
        budget: project.budget,
        spent: project.spentAmount,
        remaining: project.budget - project.spentAmount,
        percentSpent: ((project.spentAmount / project.budget) * 100).toFixed(1)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Projects by Status
export const getProjectsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const projects = await Project.find(filter)
      .select('name status progress budget spentAmount location startDate endDate')
      .sort({ createdAt: -1 })
      .lean();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Budget Overview
export const getBudgetOverview = async (req, res) => {
  try {
    const projects = await Project.find().lean();

    const categoryData = {
      labor: 0,
      materials: 0,
      equipment: 0,
      other: 0
    };

    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const totalSpent = projects.reduce((sum, p) => sum + (p.spentAmount || 0), 0);

    // Estimate category breakdown (can be enhanced with actual tracking)
    const spentRatio = totalSpent / (totalBudget || 1);
    categoryData.labor = Math.round(totalSpent * 0.35); // 35% to labor
    categoryData.materials = Math.round(totalSpent * 0.42); // 42% to materials
    categoryData.equipment = Math.round(totalSpent * 0.15); // 15% to equipment
    categoryData.other = Math.round(totalSpent * 0.08); // 8% to other

    res.json({
      totalBudget,
      totalSpent,
      totalRemaining: totalBudget - totalSpent,
      spentPercentage: ((totalSpent / (totalBudget || 1)) * 100).toFixed(1),
      byCategory: categoryData,
      projects: projects.map(p => ({
        name: p.name,
        budget: p.budget,
        spent: p.spentAmount,
        progress: p.progress
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Worker Statistics
export const getWorkerStats = async (req, res) => {
  try {
    const workers = await Worker.find().lean();
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.find({ date: today }).lean();

    const skillGroups = {};
    workers.forEach(w => {
      w.skills.forEach(skill => {
        skillGroups[skill] = (skillGroups[skill] || 0) + 1;
      });
    });

    res.json({
      total: workers.length,
      active: workers.filter(w => w.status === 'active').length,
      inactive: workers.filter(w => w.status === 'inactive').length,
      onLeave: workers.filter(w => w.status === 'on-leave').length,
      present: attendance.length,
      absent: workers.length - attendance.length,
      attendanceRate: ((attendance.length / (workers.length || 1)) * 100).toFixed(1),
      bySkill: skillGroups,
      byProficiency: {
        beginner: workers.filter(w => w.proficiencyLevel === 'beginner').length,
        intermediate: workers.filter(w => w.proficiencyLevel === 'intermediate').length,
        expert: workers.filter(w => w.proficiencyLevel === 'expert').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Task Statistics
export const getTaskStats = async (req, res) => {
  try {
    const tasks = await Task.find().lean();

    const byPriority = {
      critical: tasks.filter(t => t.priority === 'critical').length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    const byStatus = {
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      blocked: tasks.filter(t => t.status === 'blocked').length
    };

    const byCategory = {};
    tasks.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });

    const avgProgress = tasks.length > 0
      ? (tasks.reduce((sum, t) => sum + (t.progress || 0), 0) / tasks.length).toFixed(1)
      : 0;

    res.json({
      total: tasks.length,
      completed: byStatus.completed,
      inProgress: byStatus.inProgress,
      pending: byStatus.pending,
      blocked: byStatus.blocked,
      averageProgress: avgProgress,
      byPriority,
      byStatus,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Material Statistics
export const getMaterialStats = async (req, res) => {
  try {
    const materials = await Material.find().lean();

    const lowStockItems = materials.filter(m => m.currentStock <= m.minStockLevel);
    const criticalItems = materials.filter(m => m.currentStock < m.minStockLevel * 0.5);

    const totalValue = materials.reduce((sum, m) => sum + (m.currentStock * (m.unitPrice || 0)), 0);

    res.json({
      totalMaterials: materials.length,
      lowStockCount: lowStockItems.length,
      criticalStockCount: criticalItems.length,
      totalInventoryValue: totalValue,
      averageStockLevel: materials.length > 0
        ? (materials.reduce((sum, m) => sum + ((m.currentStock / (m.maxStockLevel || 1)) * 100), 0) / materials.length).toFixed(1)
        : 0,
      byCategory: materials.reduce((acc, m) => {
        acc[m.category] = (acc[m.category] || 0) + 1;
        return acc;
      }, {}),
      lowStockItems: lowStockItems.map(m => ({
        _id: m._id,
        name: m.name,
        currentStock: m.currentStock,
        minStockLevel: m.minStockLevel,
        unit: m.unit
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Attendance Statistics
export const getAttendanceStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const attendance = await Attendance.find(filter).lean();
    const workers = await Worker.find().lean();

    const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
    const geofenceViolations = attendance.filter(a => a.geofenceStatus === 'outside');

    res.json({
      totalRecords: attendance.length,
      totalWorkers: workers.length,
      todayPresent: todayAttendance.length,
      geofenceViolations: geofenceViolations.length,
      averageHours: attendance.length > 0
        ? (attendance.reduce((sum, a) => sum + (a.hoursWorked || 0), 0) / attendance.length).toFixed(1)
        : 0,
      attendanceRate: ((todayAttendance.length / (workers.length || 1)) * 100).toFixed(1)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
