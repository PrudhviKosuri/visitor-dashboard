# 🔧 Remaining API Integration Guide

## ✅ What's Already Done

- ✅ **API Infrastructure** - All service files created
- ✅ **Custom Hooks** - `useApi` and `useMutation` ready
- ✅ **Login Page** - Fully integrated with `/api/auth/login`
- ✅ **Visitor Portal Dashboard** - Fully integrated with skeleton loaders

## 🔄 What Needs To Be Done

You need to update the following files to replace dummy data with API calls:

---

## 📋 Step-by-Step Integration Pattern

Follow this pattern for each file:

### Pattern 1: Fetching Data (GET requests)

```javascript
// 1. Import services and hooks
import { residentService } from '../../services/residentService';
import { useApi } from '../../hooks/useApi';
import { CardSkeleton, TableSkeleton, ChartSkeleton } from '../../components/SkeletonLoader';

// 2. Remove dummy data imports
// DELETE: import { residentStats, ... } from '../../data/dummyResidentData';

// 3. In component, fetch data with useApi
const MyComponent = () => {
  const { data, loading, error, refetch } = useApi(
    residentService.getSummary,  // API function
    [],                          // dependencies
    true                         // fetch immediately
  );
  
  // 4. Show skeleton while loading
  if (loading) return <CardSkeleton />;
  
  // 5. Handle error
  if (error) return <div>Error: {error}</div>;
  
  // 6. Use data with safe navigation
  return <div>{data?.todaysVisitors || 0}</div>;
};
```

### Pattern 2: Mutations (POST/PUT/DELETE)

```javascript
// 1. Import useMutation
import { useMutation } from '../../hooks/useApi';
import { residentService } from '../../services/residentService';

// 2. Create mutation hook
const { mutate, loading } = useMutation(residentService.approveRequest);

// 3. Call mutation in handler
const handleApprove = async (requestId) => {
  try {
    await mutate(requestId);
    // Show success toast
    refetch(); // Refresh data
  } catch (error) {
    // Show error toast
  }
};
```

---

## 1️⃣ Resident Portal - 4 Files

### File 1: `/src/pages/resident/Dashboard.jsx`

**Current imports to REMOVE:**
```javascript
import { residentStats, weeklyTrendData, visitorTypeData } from '../../data/dummyResidentData';
```

**New imports to ADD:**
```javascript
import { residentService } from '../../services/residentService';
import { useApi } from '../../hooks/useApi';
import { CardSkeleton, ChartSkeleton } from '../../components/SkeletonLoader';
```

**Add these hooks at the top of component:**
```javascript
const Dashboard = () => {
  const { data: residentStats, loading: loadingStats } = useApi(
    residentService.getSummary,
    [],
    true
  );
  
  const { data: chartsData, loading: loadingCharts } = useApi(
    residentService.getCharts,
    [],
    true
  );
  
  const weeklyTrendData = chartsData?.weeklyTrend || [];
  const visitorTypeData = chartsData?.visitorTypes || [];
  
  // ... rest of component
```

**Update stats array (add safe navigation):**
```javascript
const stats = [
  {
    icon: Users,
    title: "Today's Visitors",
    value: residentStats?.todaysVisitors || 0,  // Add ?. operator
    // ...
  },
  // ... repeat for all stats
];
```

**Add loading state to cards:**
```javascript
{loadingStats ? (
  Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
) : (
  stats.map((stat, index) => (
    // ... existing card JSX
  ))
)}
```

**Add loading state to charts:**
```javascript
{loadingCharts ? (
  <ChartSkeleton />
) : (
  <ResponsiveContainer width="100%" height={300}>
    {/* ... existing chart JSX */}
  </ResponsiveContainer>
)}
```

---

### File 2: `/src/pages/resident/Requests.jsx`

**Current imports to REMOVE:**
```javascript
import { visitorRequests as initialRequests } from '../../data/dummyResidentData';
```

**New imports to ADD:**
```javascript
import { residentService } from '../../services/residentService';
import { useApi, useMutation } from '../../hooks/useApi';
import { TableSkeleton } from '../../components/SkeletonLoader';
import Toast from '../../components/Toast';
```

**Replace state and add hooks:**
```javascript
const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Fetch requests from API
  const { data: requests, loading, refetch } = useApi(
    residentService.getRequests,
    [],
    true
  );
  
  // Mutation hooks
  const { mutate: approveRequest } = useMutation(residentService.approveRequest);
  const { mutate: rejectRequest } = useMutation(residentService.rejectRequest);
```

**Update confirmAction to use API:**
```javascript
const confirmAction = async () => {
  try {
    if (modalData.action === 'approve') {
      await approveRequest(modalData.request.id);
      setToastMessage('Request approved!');
      setToastType('success');
    } else {
      await rejectRequest(modalData.request.id);
      setToastMessage('Request rejected!');
      setToastType('success');
    }
    
    setShowModal(false);
    setShowToast(true);
    refetch(); // Refresh data
    
    setTimeout(() => setShowToast(false), 3000);
  } catch (error) {
    setToastMessage('Failed to process request');
    setToastType('error');
    setShowToast(true);
  }
};
```

**Update filteredRequests:**
```javascript
const filteredRequests = (requests || []).filter((request) => {
  const matchesSearch =
    request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.purpose?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
  return matchesSearch && matchesFilter;
});
```

**Add loading state to table:**
```javascript
{loading ? (
  <TableSkeleton rows={5} columns={5} />
) : (
  <div className="grid grid-cols-1 gap-4">
    {filteredRequests.length === 0 ? (
      <p>No requests found</p>
    ) : (
      filteredRequests.map((request) => (
        // ... existing request card JSX
        // Update references: request.visitorName -> request.name
      ))
    )}
  </div>
)}
```

**Replace Toast notification:**
```javascript
<Toast 
  show={showToast}
  message={toastMessage}
  type={toastType}
  onClose={() => setShowToast(false)}
/>
```

---

### File 3: `/src/pages/resident/Invite.jsx`

**Remove:**
```javascript
import { recentInvitations } from '../../data/dummyResidentData';
```

**Add:**
```javascript
import { residentService } from '../../services/residentService';
import { useApi, useMutation } from '../../hooks/useApi';
import { TableSkeleton } from '../../components/SkeletonLoader';
import Toast from '../../components/Toast';
```

**Add hooks:**
```javascript
const Invite = () => {
  // ... existing state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const { data: invites, loading, refetch } = useApi(
    residentService.getInvites,
    [],
    true
  );
  
  const { mutate: sendInvite, loading: sending } = useMutation(
    residentService.sendInvite
  );
```

**Update handleSubmit:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await sendInvite({
      name: formData.name,
      email: formData.email,
      purpose: formData.purpose,
      date: formData.date,
      time: formData.time,
    });
    
    setToastMessage('Invitation sent successfully!');
    setToastType('success');
    setShowToast(true);
    
    // Reset form
    setFormData({ name: '', email: '', purpose: '', date: '', time: '' });
    
    // Refresh invites
    refetch();
    
    setTimeout(() => setShowToast(false), 3000);
  } catch (error) {
    setToastMessage('Failed to send invitation');
    setToastType('error');
    setShowToast(true);
  }
};
```

**Add loading to invites table:**
```javascript
{loading ? (
  <TableSkeleton rows={3} columns={5} />
) : (
  invites?.map((invite) => (
    // ... existing invite row JSX
  ))
)}
```

---

### File 4: `/src/pages/resident/Analytics.jsx`

**Remove:**
```javascript
import { weeklyTrendData, visitorTypeData } from '../../data/dummyResidentData';
```

**Add:**
```javascript
import { residentService } from '../../services/residentService';
import { useApi } from '../../hooks/useApi';
import { ChartSkeleton } from '../../components/SkeletonLoader';
```

**Add hooks:**
```javascript
const Analytics = () => {
  const { data: chartsData, loading } = useApi(
    residentService.getCharts,
    [],
    true
  );
  
  const weeklyTrendData = chartsData?.weeklyTrend || [];
  const visitorTypeData = chartsData?.visitorTypes || [];
  
  // ... rest of component
```

**Add loading to charts:**
```javascript
{loading ? (
  <ChartSkeleton />
) : (
  <ResponsiveContainer width="100%" height={350}>
    {/* ... chart JSX */}
  </ResponsiveContainer>
)}
```

---

## 2️⃣ Compliance Center - 4 Files

### File 1: `/src/pages/compliance/Dashboard.jsx`

**Remove:**
```javascript
import { complianceStats, auditLogs } from '../../data/dummyComplianceData';
```

**Add:**
```javascript
import { complianceService } from '../../services/complianceService';
import { useApi } from '../../hooks/useApi';
import { CardSkeleton, TableSkeleton } from '../../components/SkeletonLoader';
```

**Add hooks:**
```javascript
const Dashboard = () => {
  const { data: complianceStats, loading: loadingStats } = useApi(
    complianceService.getSummary,
    [],
    true
  );
  
  const { data: auditLogs, loading: loadingLogs } = useApi(
    complianceService.getAuditLogs,
    [],
    true
  );
```

**Update stats with safe navigation:**
```javascript
const stats = [
  {
    icon: Database,
    title: 'Data Retention Policy',
    value: `${complianceStats?.dataRetentionDays || 0} days`,
    // ...
  },
  // ... repeat for all stats
];
```

**Add loading states:**
```javascript
// For cards
{loadingStats ? (
  Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
) : (
  // ... existing cards
)}

// For table
{loadingLogs ? (
  <TableSkeleton rows={5} columns={5} />
) : (
  // ... existing table
)}
```

---

### File 2: `/src/pages/compliance/AuditLogs.jsx`

**Remove:**
```javascript
import { auditLogs as dummyLogs } from '../../data/dummyComplianceData';
```

**Add:**
```javascript
import { complianceService } from '../../services/complianceService';
import { useApi } from '../../hooks/useApi';
import { TableSkeleton } from '../../components/SkeletonLoader';
```

**Add hooks:**
```javascript
const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  
  const { data: auditLogs, loading, refetch } = useApi(
    () => complianceService.getAuditLogs({ action: filterAction }),
    [filterAction],  // Refetch when filter changes
    true
  );
```

**Update filtered logs:**
```javascript
const filteredLogs = (auditLogs || []).filter((log) =>
  log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  log.action?.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**Add loading:**
```javascript
{loading ? (
  <TableSkeleton rows={10} columns={5} />
) : (
  // ... existing table
)}
```

---

### File 3: `/src/pages/compliance/DataManagement.jsx`

**Remove:**
```javascript
import { accessRequests, dataRetentionPolicy } from '../../data/dummyComplianceData';
```

**Add:**
```javascript
import { complianceService } from '../../services/complianceService';
import { useApi, useMutation } from '../../hooks/useApi';
import { TableSkeleton } from '../../components/SkeletonLoader';
import Toast from '../../components/Toast';
```

**Add hooks:**
```javascript
const DataManagement = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const { data: accessRequests, loading: loadingRequests, refetch } = useApi(
    complianceService.getAccessRequests,
    [],
    true
  );
  
  const { data: policy, loading: loadingPolicy } = useApi(
    complianceService.getDataRetentionPolicy,
    [],
    true
  );
  
  const { mutate: updatePolicy } = useMutation(
    complianceService.updateDataRetentionPolicy
  );
  
  const { mutate: processRequest } = useMutation(
    complianceService.processAccessRequest
  );
```

**Update handlers:**
```javascript
const handlePolicyUpdate = async (newSettings) => {
  try {
    await updatePolicy(newSettings);
    setToastMessage('Policy updated successfully!');
    setToastType('success');
    setShowToast(true);
  } catch (error) {
    setToastMessage('Failed to update policy');
    setToastType('error');
    setShowToast(true);
  }
};

const handleProcessRequest = async (requestId, action) => {
  try {
    await processRequest(requestId, action);
    setToastMessage(`Request ${action}d successfully!`);
    setToastType('success');
    setShowToast(true);
    refetch();
  } catch (error) {
    setToastMessage('Failed to process request');
    setToastType('error');
    setShowToast(true);
  }
};
```

---

### File 4: `/src/pages/compliance/Settings.jsx`

**Remove:**
```javascript
import { privacySettings } from '../../data/dummyComplianceData';
```

**Add:**
```javascript
import { complianceService } from '../../services/complianceService';
import { useApi, useMutation } from '../../hooks/useApi';
import Toast from '../../components/Toast';
```

**Add hooks:**
```javascript
const Settings = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const { data: settings, loading, refetch } = useApi(
    complianceService.getPrivacySettings,
    [],
    true
  );
  
  const { mutate: updateSettings, loading: saving } = useMutation(
    complianceService.updatePrivacySettings
  );
  
  // Local state for form
  const [formSettings, setFormSettings] = useState(settings || {});
  
  // Update local state when API data loads
  useEffect(() => {
    if (settings) {
      setFormSettings(settings);
    }
  }, [settings]);
```

**Update handleSave:**
```javascript
const handleSave = async () => {
  try {
    await updateSettings(formSettings);
    setToastMessage('Settings saved successfully!');
    setShowToast(true);
    refetch();
  } catch (error) {
    setToastMessage('Failed to save settings');
    setShowToast(true);
  }
};
```

---

## 3️⃣ Admin Portal - 1 File

### File: `/src/pages/Dashboard.js` (Admin)

⚠️ **IMPORTANT**: Keep all Material-UI components, layout, and colors unchanged!

**Remove:**
```javascript
import { adminStats, liveOccupancyData, visitorFrequencyData, peakHoursData } from '../data/dummyAdminData';
```

**Add:**
```javascript
import { adminService } from '../services/adminService';
import { useApi } from '../hooks/useApi';
```

**Add hooks at top of component:**
```javascript
const Dashboard = () => {
  const { visitors } = useVisitors();  // Keep existing context
  
  // Add API calls
  const { data: adminStats, loading: loadingStats } = useApi(
    adminService.getSummary,
    [],
    true
  );
  
  const { data: occupancyData, loading: loadingOccupancy } = useApi(
    adminService.getOccupancy,
    [],
    true
  );
  
  const { data: chartsData, loading: loadingCharts } = useApi(
    adminService.getCharts,
    [],
    true
  );
  
  // Extract chart data
  const visitorFrequencyData = chartsData?.visitorFrequency || [];
  const topStartupsData = chartsData?.topStartups || [];
  const peakHoursData = chartsData?.peakHours || [];
  const liveOccupancyData = occupancyData || [];
```

**Update stat cards (around line 135-170):**
```javascript
<StatCard
  title="TOTAL VISITORS TODAY"
  value={adminStats?.totalVisitorsToday || 0}  // Add ?. operator
  subtitle="+12% from last month"
  icon={<PeopleIcon sx={{ fontSize: 32, color: '#1e3a5f' }} />}
  iconBg="#e8eef5"
/>
// Repeat for all 4 stat cards
```

**For the occupancy table (map over liveOccupancyData):**
- Just add safe navigation: `liveOccupancyData?.map(...)`
- No other changes needed

**For charts:**
- Just add safe navigation to data sources
- Keep all Material-UI/Recharts styling unchanged

---

## 🧪 Testing Checklist

After making changes to each file:

- [ ] No console errors
- [ ] Skeleton loaders appear while loading
- [ ] Data displays correctly when loaded
- [ ] Error handling works (test by turning off backend)
- [ ] Mutations work (approve, reject, send invite, etc.)
- [ ] Toast notifications appear
- [ ] Refetching works after mutations
- [ ] Safe navigation prevents crashes (?.operator)
- [ ] Mobile responsiveness maintained

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot read property 'X' of undefined"
**Fix**: Add safe navigation operators
```javascript
// ❌ Bad
value: data.todaysVisitors

// ✅ Good
value: data?.todaysVisitors || 0
```

### Issue 2: Loading state not showing
**Fix**: Check that loading variable is used
```javascript
{loading ? <Skeleton /> : <Content />}
```

### Issue 3: API calls not triggering
**Fix**: Check dependencies array in useApi
```javascript
const { data } = useApi(
  apiFunction,
  [dependency1, dependency2],  // Refetch when these change
  true  // Fetch on mount
);
```

### Issue 4: Mutations not refreshing data
**Fix**: Call refetch() after successful mutation
```javascript
await mutate(data);
refetch();  // Don't forget this!
```

---

## 📝 Quick Reference

### Import Checklist for Each File

```javascript
// Services
import { visitorService } from '../services/visitorService';
import { residentService } from '../services/residentService';
import { complianceService } from '../services/complianceService';
import { adminService } from '../services/adminService';

// Hooks
import { useApi, useMutation } from '../hooks/useApi';

// UI Components
import { CardSkeleton, TableSkeleton, ChartSkeleton } from '../components/SkeletonLoader';
import Toast from '../components/Toast';
```

### useApi Pattern

```javascript
const { 
  data,        // API response data
  loading,     // Boolean: is loading
  error,       // Error message if failed
  refetch      // Function to refetch data
} = useApi(
  apiFunction,           // Service function
  [dep1, dep2],         // Dependencies
  true                  // Fetch immediately
);
```

### useMutation Pattern

```javascript
const { 
  mutate,      // Function to call
  loading,     // Boolean: is loading
  error,       // Error message
  data         // Response data
} = useMutation(apiFunction);

// Usage
await mutate(arg1, arg2);
```

---

## ✅ Final Steps

1. Update each file following the patterns above
2. Test each portal individually
3. Verify all loading states work
4. Test error scenarios
5. Verify mobile responsiveness
6. Test all mutations (approve, reject, send, update)
7. Check that refetching works
8. Verify Admin Portal layout unchanged

---

**Need Help?** Refer to the completed Visitor Portal Dashboard as a working example!

**File**: `/src/pages/visitor/Dashboard.jsx`
