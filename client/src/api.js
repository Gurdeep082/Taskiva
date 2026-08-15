const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const buildHeaders = (token = null, extra = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extra,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const getMockState = () => {
  const defaultState = {
    users: [
      {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@taskiva.com',
        phone: '9999999999',
        password: 'admin@903460',
        role: 'admin',
      },
      {
        id: 'client-1',
        name: 'Aman Singh',
        email: 'client@taskiva.com',
        phone: '9876543210',
        password: 'client123',
        role: 'client',
      },
      {
        id: 'tasker-1',
        name: 'Gurdeep Singh',
        email: 'tasker@taskiva.com',
        phone: '9123456780',
        password: 'tasker123',
        role: 'tasker',
      },
    ],
    tasks: [
      {
        _id: 'task-1',
        title: 'Plumbing Fix',
        service: 'Plumbing',
        location: 'Sector 34, Chandigarh',
        status: 'booked',
        budget: 1299,
        clientId: 'client-1',
        clientName: 'Aman Singh',
        assignedTaskerId: null,
      },
      {
        _id: 'task-2',
        title: 'AC Service',
        service: 'AC Repair',
        location: 'Manimajra, Chandigarh',
        status: 'in_progress',
        budget: 1899,
        clientId: 'client-1',
        clientName: 'Aman Singh',
        assignedTaskerId: 'tasker-1',
      },
      {
        _id: 'task-3',
        title: 'Electrical Work',
        service: 'Electrical',
        location: 'Madhya Marg, Chandigarh',
        status: 'booked',
        budget: 1599,
        clientId: 'client-2',
        clientName: 'Neha Sharma',
        assignedTaskerId: null,
      },
    ],
  };

  const stored = localStorage.getItem('taskiva_mock_state');

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem('taskiva_mock_state', JSON.stringify(defaultState));
  return defaultState;
};

const saveMockState = (state) => {
  localStorage.setItem('taskiva_mock_state', JSON.stringify(state));
};

const mockApi = async (endpoint, method = 'GET', data = null) => {
  const state = getMockState();
  const user = JSON.parse(localStorage.getItem('taskiva_user') || 'null');

  if (endpoint === '/auth/login') {
    const { email, password } = data;
    const foundUser = state.users.find(
      (entry) => entry.email === email || entry.phone === email
    );

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (foundUser.password !== password) {
      throw new Error('Wrong password');
    }

    const result = {
      token: `mock-token-${foundUser.role}`,
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
      customId: foundUser.role === 'admin' ? 'ADM-0001' : foundUser.role === 'tasker' ? 'TSK-1001' : 'USR-1001',
    };

    localStorage.setItem('taskiva_user', JSON.stringify(result));
    return result;
  }

  if (endpoint === '/auth/register') {
    const { name, email, phone, password, role = 'client' } = data;

    if (!name || !email || !password) {
      throw new Error('Please fill all required fields');
    }

    if (state.users.some((entry) => entry.email === email || entry.phone === phone)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      phone,
      password,
      role,
    };

    state.users.push(newUser);
    saveMockState(state);

    const result = {
      token: `mock-token-${role}`,
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      customId: role === 'tasker' ? 'TSK-1002' : 'USR-1002',
    };

    localStorage.setItem('taskiva_user', JSON.stringify(result));
    return result;
  }

  if (endpoint === '/dashboard/client') {
    if (!user) {
      throw new Error('Please login first');
    }

    const clientTasks = state.tasks.filter((task) => task.clientId === user.id);

    return {
      tasks: clientTasks,
      stats: {
        totalTasks: clientTasks.length,
        bookedCount: clientTasks.filter((task) => task.status === 'booked').length,
        inProgressCount: clientTasks.filter((task) => task.status === 'in_progress').length,
        completedCount: clientTasks.filter((task) => task.status === 'completed').length,
      },
    };
  }

  if (endpoint === '/dashboard/tasker') {
    if (!user) {
      throw new Error('Please login first');
    }

    const availableTasks = state.tasks.filter((task) => task.status === 'booked' && !task.assignedTaskerId);
    const assignedTasks = state.tasks.filter(
      (task) => task.assignedTaskerId === user.id || task.status === 'in_progress'
    );

    return {
      availableTasks,
      assignedTasks,
      stats: {
        pendingRequests: availableTasks.length,
        acceptedTasks: assignedTasks.filter((task) => task.status === 'accepted').length,
        inProgressTasks: assignedTasks.filter((task) => task.status === 'in_progress').length,
        completedTasks: assignedTasks.filter((task) => task.status === 'completed').length,
      },
    };
  }

  if (endpoint.startsWith('/tasks/') && method === 'PATCH') {
    const taskId = endpoint.split('/')[2];
    const taskIndex = state.tasks.findIndex((task) => task._id === taskId);

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const currentTask = state.tasks[taskIndex];

    if (endpoint.includes('/accept')) {
      currentTask.status = 'accepted';
      currentTask.assignedTaskerId = user?.id || 'tasker-1';
      saveMockState(state);
      return { message: 'Task accepted successfully', task: currentTask };
    }

    if (endpoint.includes('/status')) {
      currentTask.status = data.status;
      saveMockState(state);
      return { message: 'Task status updated', task: currentTask };
    }
  }

  if (endpoint === '/tasks/book' && method === 'POST') {
    const newTask = {
      _id: `task-${Date.now()}`,
      title: data.title || data.service,
      service: data.service,
      location: data.location,
      status: 'booked',
      budget: Number(data.budget || 1299),
      clientId: user?.id || 'client-1',
      clientName: user?.name || 'Aman Singh',
      assignedTaskerId: null,
    };

    state.tasks.unshift(newTask);
    saveMockState(state);
    return { success: true, task: newTask };
  }

  return { success: true };
};

export const api = {
  async get(endpoint, token = null) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: buildHeaders(token),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Request failed');
      }

      return response.json();
    } catch (error) {
      return mockApi(endpoint, 'GET');
    }
  },

  async post(endpoint, data, token = null) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: buildHeaders(token),
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || 'Request failed');
      }

      return payload;
    } catch (error) {
      return mockApi(endpoint, 'POST', data);
    }
  },

  async patch(endpoint, data, token = null) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: buildHeaders(token),
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || 'Request failed');
      }

      return payload;
    } catch (error) {
      return mockApi(endpoint, 'PATCH', data);
    }
  },
};
