# SiteSyncAI Backend

Complete Node.js backend for the SiteSyncAI construction project management platform with MongoDB database integration.

## Features

- **Worker Management**: Create, update, and manage construction workers with skills and proficiency levels
- **Task Management**: Assign and track construction tasks with progress monitoring
- **Material Management**: Inventory management with stock level tracking and alerts
- **Attendance Tracking**: Record and monitor worker attendance and hours worked
- **Safety Management**: Report and track hazards with risk assessment
- **API-First Design**: RESTful API endpoints for all operations
- **Database**: MongoDB for scalable data storage
- **Error Handling**: Comprehensive error handling and validation
- **CORS Enabled**: Ready for multiple frontend applications

## Prerequisites

- Node.js 16+ 
- MongoDB 4.4+ (local or cloud instance)
- npm or pnpm package manager

## Installation

### 1. Install Dependencies

```bash
cd Backend
npm install
# or
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the Backend directory:

```bash
cp .env.example .env
```

Then edit `.env` and update the values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sitesyncai
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

### 3. MongoDB Setup

#### Local MongoDB
If you have MongoDB installed locally:
```bash
mongod
```

#### Docker MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get the connection string and update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

### Health Check
```bash
curl http://localhost:5000/api/health
```

## API Endpoints

### Workers
- `POST /api/workers` - Create a new worker
- `GET /api/workers` - Get all workers (supports filters)
- `GET /api/workers/search?query=...` - Search workers
- `GET /api/workers/:id` - Get worker by ID
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks (supports filters)
- `GET /api/tasks/worker/:workerId` - Get tasks for a worker
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Materials
- `POST /api/materials` - Create a new material
- `GET /api/materials` - Get all materials (supports filters)
- `GET /api/materials/low-stock` - Get materials below minimum stock
- `GET /api/materials/:id` - Get material by ID
- `PUT /api/materials/:id` - Update material
- `PATCH /api/materials/:id/stock` - Update material stock
- `DELETE /api/materials/:id` - Delete material

### Attendance
- `POST /api/attendance` - Record attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/worker/:workerId` - Get worker's attendance
- `GET /api/attendance/:id` - Get attendance record
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Hazards
- `POST /api/hazards` - Report a hazard
- `GET /api/hazards` - Get all hazards (supports filters)
- `GET /api/hazards/critical` - Get critical hazards
- `GET /api/hazards/:id` - Get hazard by ID
- `PUT /api/hazards/:id` - Update hazard
- `DELETE /api/hazards/:id` - Delete hazard

## Example API Calls

### Create a Worker
```bash
curl -X POST http://localhost:5000/api/workers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "555-1234",
    "email": "john@example.com",
    "skills": ["carpentry", "masonry"],
    "proficiencyLevel": "advanced",
    "status": "active",
    "creator": "manager1"
  }'
```

### Get All Workers
```bash
curl http://localhost:5000/api/workers
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Foundation Work",
    "description": "Prepare foundation for building",
    "assignedTo": "WORKER_ID",
    "priority": "high",
    "category": "foundation",
    "dueDate": "2026-02-01",
    "estimatedHours": 40,
    "creator": "manager1"
  }'
```

### Create a Material
```bash
curl -X POST http://localhost:5000/api/materials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Portland Cement",
    "category": "cement",
    "quantity": 500,
    "unit": "bags",
    "currentStock": 450,
    "minStockLevel": 100,
    "unitPrice": 5.50,
    "creator": "manager1"
  }'
```

## Database Schema

### Workers Collection
```javascript
{
  name: String,
  phone: String,
  email: String,
  skills: [String],
  proficiencyLevel: String,
  status: String,
  hourlyRate: Number,
  totalHoursWorked: Number,
  creator: String
}
```

### Tasks Collection
```javascript
{
  title: String,
  description: String,
  assignedTo: ObjectId (reference to Worker),
  priority: String,
  category: String,
  status: String,
  dueDate: Date,
  estimatedHours: Number,
  actualHours: Number,
  progress: Number,
  creator: String
}
```

### Materials Collection
```javascript
{
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  currentStock: Number,
  minStockLevel: Number,
  unitPrice: Number,
  supplier: String,
  creator: String
}
```

### Attendance Collection
```javascript
{
  workerId: ObjectId,
  date: Date,
  checkInTime: Date,
  checkOutTime: Date,
  hoursWorked: Number,
  status: String,
  creator: String
}
```

### Hazards Collection
```javascript
{
  title: String,
  description: String,
  location: String,
  riskLevel: String,
  category: String,
  status: String,
  affectedWorkers: [ObjectId],
  creator: String
}
```

## Frontend Integration

The frontend applications are configured to connect to the backend. Each frontend project has a `.env` file with:

```env
VITE_API_URL=http://localhost:5000/api
```

### Using the API in Frontend Components

```javascript
import { workerAPI, taskAPI, materialAPI } from '../path/to/api';

// Get workers
const workers = await workerAPI.getAll();

// Create a task
const task = await taskAPI.create({
  title: 'New Task',
  description: 'Task details',
  assignedTo: workerId,
  priority: 'high',
  category: 'electrical',
  dueDate: new Date(),
  estimatedHours: 8,
  creator: 'user@example.com'
});
```

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── workerController.js
│   │   ├── taskController.js
│   │   ├── materialController.js
│   │   ├── attendanceController.js
│   │   └── hazardController.js
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── Worker.js
│   │   ├── Task.js
│   │   ├── Material.js
│   │   ├── Attendance.js
│   │   ├── Hazard.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── workers.js
│   │   ├── tasks.js
│   │   ├── materials.js
│   │   ├── attendance.js
│   │   └── hazards.js
│   ├── api/
│   │   └── api.js              # API client for frontend
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── .env.example                 # Example env file
└── package.json
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Node environment |
| `PORT` | 5000 | Server port |
| `MONGODB_URI` | mongodb://localhost:27017/sitesyncai | MongoDB connection string |
| `JWT_SECRET` | - | Secret for JWT tokens |
| `CORS_ORIGIN` | http://localhost:5173,http://localhost:5174 | Allowed CORS origins |

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "details": ["Additional details if available"]
}
```

## Running All Services

### Terminal 1 - MongoDB
```bash
mongod
```

### Terminal 2 - Backend
```bash
cd Backend
npm run dev
```

### Terminal 3 - Project Manager Frontend
```bash
cd Project_Manager
npm run dev
```

### Terminal 4 - Site Manager Frontend
```bash
cd Site_Manager
npm run dev
```

## Testing the Connection

Once all services are running, test the connection:

```bash
# Check backend health
curl http://localhost:5000/api/health

# Create a test worker
curl -X POST http://localhost:5000/api/workers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"555-0000","skills":["test"],"creator":"system"}'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is accessible (firewall, credentials)

### CORS Errors
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Ensure frontend is making requests to `http://localhost:5000/api`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## License

ISC

## Support

For issues or questions, please check the main README or contact the development team.
