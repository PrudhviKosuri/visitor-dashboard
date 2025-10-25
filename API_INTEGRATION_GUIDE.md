# 🔌 API Integration Guide - Backend Integration Complete

## ✅ What Has Been Implemented

Your React frontend is now fully configured to consume backend APIs instead of dummy data. Here's what has been set up:

---

## 📁 New File Structure

```
src/
├── config/
│   └── api.js                    # Axios configuration with interceptors
├── services/
│   ├── authService.js            # Authentication API calls
│   ├── visitorService.js         # Visitor Portal API calls
│   ├── residentService.js        # Resident Portal API calls
│   ├── complianceService.js      # Compliance Portal API calls
│   └── adminService.js           # Admin Portal API calls
└── hooks/
    └── useApi.js                 # Custom hooks for API calls with loading/error states
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```bash
REACT_APP_API_URL=https://your-api-domain.com/api
```

---

## 📡 API Endpoints Required

Your backend needs to implement these endpoints:

### 1️⃣ **Authentication** (`/api/auth/*`)

```
POST /api/auth/login
Body: { email, password, role }
Response: { token, role, name, message }
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "visitor",
  "name": "John Doe",
  "message": "Login successful"
}
```

---

### 2️⃣ **Visitor Portal** (`/api/visitor*`)

```
GET /api/visitor-summary
Response: { todaysVisitors, pendingApprovals, approvedVisits, totalThisMonth }

GET /api/visitors/check-ins
Response: [{ id, name, purpose, date, time, status, resident }]

GET /api/visitor-charts
Response: {
  dailyVisitors: [{ day, visitors }],
  visitorTypes: [{ name, value, color }]
}

POST /api/visitors/register
Body: { name, email, purpose, date, time }
Response: { success, message, visitId }

GET /api/visitors/history
Response: [{ id, date, time, purpose, host, status, checkIn, checkOut }]

GET /api/visitors/profile
Response: { name, email, phone, company, photo }

PUT /api/visitors/profile
Body: { name, email, phone, company }
Response: { success, message }
```

**Example Summary Response:**
```json
{
  "todaysVisitors": 42,
  "pendingApprovals": 7,
  "approvedVisits": 15,
  "totalThisMonth": 128
}
```

---

### 3️⃣ **Resident Portal** (`/api/residents/*`)

```
GET /api/residents/summary
Response: { todaysVisitors, pendingRequests, approvedVisits, totalThisMonth }

GET /api/residents/requests
Response: [{ id, name, purpose, date, time, status, email, phone }]

POST /api/residents/requests/:id/approve
Response: { success, message }

POST /api/residents/requests/:id/reject
Response: { success, message }

GET /api/residents/invites
Response: [{ id, name, email, purpose, date, time, status }]

POST /api/residents/invites
Body: { name, email, purpose, date, time }
Response: { success, message, inviteId }

GET /api/residents/charts
Response: {
  weeklyTrend: [{ day, visits }],
  visitorTypes: [{ name, value, color }]
}

GET /api/residents/profile
Response: { name, email, phone, company, role }

PUT /api/residents/profile
Body: { name, email, phone, company }
Response: { success, message }
```

---

### 4️⃣ **Privacy & Compliance Center** (`/api/compliance/*`)

```
GET /api/compliance/summary
Response: { dataRetentionDays, totalRecordsStored, lastAuditDate, complianceMode }

GET /api/compliance/audit-logs
Query Params: ?startDate=...&endDate=...&action=...
Response: [{ id, action, user, timestamp, details, status }]

GET /api/compliance/access-requests
Response: [{ id, requester, email, requestType, date, status, description }]

POST /api/compliance/access-requests/:id/approve
Response: { success, message }

POST /api/compliance/access-requests/:id/reject
Response: { success, message }

GET /api/compliance/data-retention
Response: { enabled, retentionPeriod, autoDelete, backupEnabled, encryptionEnabled }

PUT /api/compliance/data-retention
Body: { enabled, retentionPeriod, autoDelete, backupEnabled, encryptionEnabled }
Response: { success, message }

GET /api/compliance/privacy-settings
Response: { gdprCompliant, cookieConsent, dataMinimization, ... }

PUT /api/compliance/privacy-settings
Body: { gdprCompliant, cookieConsent, ... }
Response: { success, message }

GET /api/compliance/audit-logs/export
Query Params: ?format=csv
Response: Blob (CSV/PDF file)
```

**Example Compliance Summary:**
```json
{
  "dataRetentionDays": 90,
  "totalRecordsStored": 200,
  "lastAuditDate": "2025-10-25",
  "complianceMode": "GDPR"
}
```

---

### 5️⃣ **Admin Portal** (`/api/admin/*`)

```
GET /api/admin/summary
Response: { totalVisitorsToday, totalActiveResidents, currentOccupancy, watchlistAlerts }

GET /api/admin/occupancy
Response: [{ id, name, resident, purpose, checkInTime, checkOutTime, status }]

GET /api/admin/charts
Response: {
  visitorFrequency: [{ day, visitors }],
  topStartups: [{ name, visits, color }],
  peakHours: [{ hour, visitors }]
}

GET /api/admin/residents
Response: [{ id, name, members, status, joinDate, totalVisitors }]

POST /api/admin/residents
Body: { name, members, joinDate }
Response: { success, message, residentId }

PATCH /api/admin/residents/:id/status
Body: { status: 'Active' | 'Inactive' }
Response: { success, message }

GET /api/admin/reports
Query Params: ?startDate=...&endDate=...&residentId=...
Response: { dateRange, totalVisitors, averageVisitsPerDay, peakDay, mostVisitedResident, filters }

GET /api/admin/reports/export
Query Params: ?format=pdf&startDate=...&endDate=...
Response: Blob (PDF/CSV file)

GET /api/admin/watchlist
Response: [{ id, visitorId, visitorName, reason, addedDate, status }]

POST /api/admin/watchlist
Body: { visitorId, reason }
Response: { success, message }

DELETE /api/admin/watchlist/:visitorId
Response: { success, message }
```

**Example Admin Summary:**
```json
{
  "totalVisitorsToday": 42,
  "totalActiveResidents": 10,
  "currentOccupancy": 32,
  "watchlistAlerts": 3
}
```

---

## 🔐 Authentication Flow

1. User logs in via `/api/auth/login`
2. Backend returns JWT token
3. Token is stored in `localStorage`
4. All subsequent API calls include token in `Authorization` header
5. If token expires (401 response), user is redirected to login

**Token Storage:**
```javascript
localStorage.setItem('authToken', response.token);
localStorage.setItem('userRole', response.role);
localStorage.setItem('userName', response.name);
```

---

## 🎯 Updated Components

### ✅ Login Page (`/src/pages/auth/Login.jsx`)
- Now calls `/api/auth/login`
- Stores JWT token
- Redirects based on role
- Shows API error messages

### ✅ Visitor Portal (`/src/pages/visitor/Dashboard.jsx`)
- Fetches summary from `/api/visitor-summary`
- Fetches check-ins from `/api/visitors/check-ins`
- Fetches charts from `/api/visitor-charts`
- Shows skeleton loaders while loading
- Handles API errors

### 🔄 Resident Portal (Partially Updated)
- **Next Step**: Update Dashboard, Requests, Invite, Analytics pages

### 🔄 Compliance Center (Partially Updated)
- **Next Step**: Update Dashboard, Audit Logs, Data Management pages

### 🔄 Admin Portal (Partially Updated)
- **Next Step**: Update Dashboard with API calls (layout unchanged)

---

## 🛠️ How to Use the API Services

### Example: Fetching Data in a Component

```javascript
import { visitorService } from '../services/visitorService';
import { useApi } from '../hooks/useApi';
import { CardSkeleton } from '../components/SkeletonLoader';

const MyComponent = () => {
  // Fetch data with loading and error states
  const { data, loading, error, refetch } = useApi(
    visitorService.getSummary,
    [], // dependencies
    true // fetch immediately on mount
  );

  if (loading) return <CardSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Today's Visitors: {data?.todaysVisitors}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

### Example: Mutation (POST/PUT/DELETE)

```javascript
import { residentService } from '../services/residentService';
import { useMutation } from '../hooks/useApi';

const ApproveButton = ({ requestId }) => {
  const { mutate, loading } = useMutation(
    residentService.approveRequest
  );

  const handleApprove = async () => {
    try {
      await mutate(requestId);
      alert('Request approved!');
    } catch (error) {
      alert('Failed to approve request');
    }
  };

  return (
    <button onClick={handleApprove} disabled={loading}>
      {loading ? 'Approving...' : 'Approve'}
    </button>
  );
};
```

---

## 🧪 Testing Without Backend

### Option 1: Use JSON Server (Mock API)

Install JSON Server:
```bash
npm install -g json-server
```

Create `db.json`:
```json
{
  "visitor-summary": {
    "todaysVisitors": 42,
    "pendingApprovals": 7,
    "approvedVisits": 15,
    "totalThisMonth": 128
  },
  "visitors": [
    { "id": 1, "name": "John Doe", "purpose": "Meeting" }
  ]
}
```

Run mock server:
```bash
json-server --watch db.json --port 5000 --routes routes.json
```

### Option 2: Use Mock Service Worker (MSW)

Install MSW:
```bash
npm install msw --save-dev
```

Create mock handlers in `src/mocks/handlers.js`

### Option 3: Temporarily Fall Back to Dummy Data

If backend is not ready, keep dummy data imports as fallback:

```javascript
import { visitorService } from '../services/visitorService';
import { visitorStats as dummyStats } from '../data/dummyVisitorData';

const { data: visitorStats } = useApi(visitorService.getSummary, [], true);

// Use API data if available, otherwise fall back to dummy
const stats = visitorStats || dummyStats;
```

---

## 🚨 Error Handling

### Global Error Handling

Errors are caught by Axios interceptors in `/src/config/api.js`:

- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: Logs error
- **404 Not Found**: Logs error  
- **500 Server Error**: Logs error
- **Network Error**: Shows "Network error" message

### Component-Level Error Handling

```javascript
const { data, loading, error } = useApi(visitorService.getSummary);

if (error) {
  return (
    <div className="bg-red-100 p-4 rounded">
      <p className="text-red-800">Failed to load data: {error}</p>
      <button onClick={refetch}>Retry</button>
    </div>
  );
}
```

---

## 📊 Loading States

All API calls show skeleton loaders while fetching:

```javascript
{loading ? (
  <CardSkeleton />
) : (
  <div>
    {/* Actual content */}
  </div>
)}
```

Available skeleton components:
- `<CardSkeleton />` - For stat cards
- `<TableSkeleton rows={5} columns={4} />` - For tables
- `<ChartSkeleton />` - For charts
- `<LoadingSpinner size="md" text="Loading..." />` - General spinner

---

## 🔄 Real-time Updates (Optional)

To add real-time updates using WebSocket:

```javascript
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('visitor-checked-in', (data) => {
  // Update state
  refetch();
});
```

---

## 📦 Required npm Packages

Already installed:
- ✅ `axios` - HTTP client
- ✅ `react-router-dom` - Routing
- ✅ `framer-motion` - Animations

Optional (for advanced features):
- `socket.io-client` - Real-time updates
- `react-query` or `swr` - Advanced data fetching
- `msw` - Mock Service Worker for testing

---

## 🎯 Next Steps

### For Frontend Developer:

1. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

2. **Test login flow**
   - Try logging in with test credentials
   - Verify token is stored
   - Check network tab for API calls

3. **Update remaining portals**
   - Resident Portal Dashboard
   - Compliance Center Dashboard
   - Admin Portal Dashboard

4. **Test all features**
   - Check all loading states
   - Verify error handling
   - Test all mutations (approve, reject, etc.)

### For Backend Developer:

1. **Implement authentication endpoint**
   - JWT token generation
   - Role-based access control

2. **Implement portal endpoints**
   - Start with most critical (visitor-summary, check-ins)
   - Add pagination for large datasets
   - Implement proper error responses

3. **Add CORS configuration**
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }));
   ```

4. **Test with frontend**
   - Use Postman/Thunder Client first
   - Then test with React app

---

## ✅ Checklist

- [x] Axios configured with interceptors
- [x] All service files created
- [x] Custom hooks for data fetching
- [x] Login page updated with API
- [x] Visitor Portal updated with API
- [x] Skeleton loaders implemented
- [x] Error handling configured
- [ ] Resident Portal updated
- [ ] Compliance Center updated
- [ ] Admin Portal updated
- [ ] Backend API implementation
- [ ] Full integration testing
- [ ] Production deployment

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Check network tab for failed API calls
3. Verify `.env` file is configured correctly
4. Ensure backend server is running
5. Check CORS configuration on backend

---

**Last Updated**: October 26, 2025  
**Status**: Login + Visitor Portal Integrated ✅  
**Ready for**: Remaining portal updates + Backend implementation
