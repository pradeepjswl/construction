const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const headers = {
  'Content-Type': 'application/json',
};

// Worker API
export const workerAPI = {
  create: async (workerData) => {
    const res = await fetch(`${API_BASE_URL}/workers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(workerData),
    });
    if (!res.ok) throw new Error('Failed to create worker');
    return res.json();
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/workers?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch workers');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/workers/${id}`, { headers });
    if (!res.ok) throw new Error('Worker not found');
    return res.json();
  },

  update: async (id, workerData) => {
    const res = await fetch(`${API_BASE_URL}/workers/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(workerData),
    });
    if (!res.ok) throw new Error('Failed to update worker');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/workers/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete worker');
    return res.json();
  },

  search: async (query) => {
    const res = await fetch(`${API_BASE_URL}/workers/search?query=${query}`, { headers });
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },
};

// Task API
export const taskAPI = {
  create: async (taskData) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/tasks?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, { headers });
    if (!res.ok) throw new Error('Task not found');
    return res.json();
  },

  update: async (id, taskData) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return res.json();
  },

  getByWorker: async (workerId) => {
    const res = await fetch(`${API_BASE_URL}/tasks/worker/${workerId}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch worker tasks');
    return res.json();
  },
};

// Material API
export const materialAPI = {
  create: async (materialData) => {
    const res = await fetch(`${API_BASE_URL}/materials`, {
      method: 'POST',
      headers,
      body: JSON.stringify(materialData),
    });
    if (!res.ok) throw new Error('Failed to create material');
    return res.json();
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/materials?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch materials');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/materials/${id}`, { headers });
    if (!res.ok) throw new Error('Material not found');
    return res.json();
  },

  update: async (id, materialData) => {
    const res = await fetch(`${API_BASE_URL}/materials/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(materialData),
    });
    if (!res.ok) throw new Error('Failed to update material');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/materials/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete material');
    return res.json();
  },

  updateStock: async (id, quantity) => {
    const res = await fetch(`${API_BASE_URL}/materials/${id}/stock`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error('Failed to update stock');
    return res.json();
  },

  getLowStock: async () => {
    const res = await fetch(`${API_BASE_URL}/materials/low-stock`, { headers });
    if (!res.ok) throw new Error('Failed to fetch low stock items');
    return res.json();
  },
};

// Attendance API
export const attendanceAPI = {
  record: async (attendanceData) => {
    const res = await fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers,
      body: JSON.stringify(attendanceData),
    });
    if (!res.ok) throw new Error('Failed to record attendance');
    return res.json();
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/attendance?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/attendance/${id}`, { headers });
    if (!res.ok) throw new Error('Attendance record not found');
    return res.json();
  },

  update: async (id, attendanceData) => {
    const res = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(attendanceData),
    });
    if (!res.ok) throw new Error('Failed to update attendance');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete attendance');
    return res.json();
  },

  getWorkerAttendance: async (workerId, filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/attendance/worker/${workerId}?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch worker attendance');
    return res.json();
  },
};

// Hazard API
export const hazardAPI = {
  report: async (hazardData) => {
    const res = await fetch(`${API_BASE_URL}/hazards`, {
      method: 'POST',
      headers,
      body: JSON.stringify(hazardData),
    });
    if (!res.ok) throw new Error('Failed to report hazard');
    return res.json();
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/hazards?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch hazards');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/hazards/${id}`, { headers });
    if (!res.ok) throw new Error('Hazard not found');
    return res.json();
  },

  update: async (id, hazardData) => {
    const res = await fetch(`${API_BASE_URL}/hazards/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(hazardData),
    });
    if (!res.ok) throw new Error('Failed to update hazard');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/hazards/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete hazard');
    return res.json();
  },

  getCritical: async () => {
    const res = await fetch(`${API_BASE_URL}/hazards/critical`, { headers });
    if (!res.ok) throw new Error('Failed to fetch critical hazards');
    return res.json();
  },
};
