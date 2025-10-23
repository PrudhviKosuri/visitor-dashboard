# Innovation Incubator - Visitor Management System

A comprehensive React.js web dashboard for managing visitors in an innovation incubator environment. This system provides real-time visitor tracking, approval workflows, and device monitoring capabilities.

## 🚀 Features

### Core Features (Must-Have)
- **Live Visitor Table**: Real-time visitor list with check-in/check-out functionality
- **Auto-refresh**: Updates every 30 seconds to simulate live data
- **Check-out Management**: One-click visitor check-out with timestamp tracking
- **Filtering & Search**: Filter by status, date, and search by name/company/host
- **QR Code & Face Recognition Support**: Visual indicators for entry methods

### Dashboard & Analytics
- **Summary Cards**: Total visitors, current occupancy, peak hours, unique companies
- **Interactive Charts**: Hourly visitor traffic and purpose distribution
- **Recent Activity**: Live feed of latest check-ins

### Visitor Approval System
- **Pending Requests**: Review visitor requests before entry
- **Approval Workflow**: Approve/reject with automatic check-in
- **Request Details**: Company, host, purpose, and timing information

### Device & Kiosk Monitoring
- **Device Status**: Real-time monitoring of kiosks and tablets
- **Health Dashboard**: System health percentage and alerts
- **Connection Tracking**: Last ping times and offline notifications

## 🛠 Tech Stack

- **Frontend**: React 19.2.0 with functional components and hooks
- **Routing**: React Router DOM
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Styling**: Material-UI theming + custom CSS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start
```bash
# Clone or download the project
cd visitor-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### Production Build
```bash
# Create optimized build
npm run build

# Serve the build (optional)
npx serve -s build
```

## 🏗 Project Structure

```
src/
├── components/           # Reusable components
│   └── Navbar.js        # Navigation bar
├── pages/               # Main page components
│   ├── Dashboard.js     # Analytics dashboard
│   ├── VisitorTable.js  # Main visitor management
│   ├── Approvals.js     # Visitor approval panel
│   └── DeviceStatus.js  # Device monitoring
├── context/             # State management
│   └── VisitorContext.js # Visitor data context
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point
```

## 🎯 Key Components

### Visitor Table Features
- Real-time visitor list with filtering
- Check-in/check-out status management
- Search functionality (name, company, host)
- Date range filtering (today/all time)
- Method indicators (QR, Face, Manual)

### Dashboard Analytics
- Live visitor statistics
- Hourly traffic charts
- Purpose distribution pie chart
- Recent activity feed

### Approval Workflow
- Pending visitor requests
- Approve/reject actions
- Automatic check-in on approval
- Request details display

### Device Management
- Kiosk status monitoring
- Online/offline indicators
- Last ping timestamps
- System health overview

## 🔧 Configuration

### Mock Data
The system uses generated mock data for demonstration:
- 15 sample visitors with realistic check-in patterns
- 4 pending approval requests
- 4 monitoring devices with various statuses

### Auto-refresh
- Visitor data refreshes every 30 seconds
- New visitors may be automatically added
- Random check-outs simulate real activity

## 🚀 Deployment

### Hackathon Quick Deploy
```bash
# Build for production
npm run build

# Deploy to any static hosting (Netlify, Vercel, etc.)
# Upload the 'build' folder contents
```

### Environment Considerations
- Fully client-side application
- No backend required for demo
- Works with any static web hosting
- Mobile responsive design

## 📱 Responsive Design
- Desktop-first design with mobile support
- Material-UI responsive breakpoints
- Touch-friendly interface elements
- Optimized for tablet kiosks

## 🔮 Future Enhancements
- Real backend integration
- Push notifications
- QR code generation
- Face recognition API integration
- PDF visitor reports
- SMS/email notifications
- Multi-tenant support

## 🎮 Demo Usage

1. **Dashboard**: View real-time statistics and charts
2. **Visitors**: Manage active visitors and check them out
3. **Approvals**: Process pending visitor requests
4. **Devices**: Monitor kiosk and device status

## 🏆 Hackathon Ready

This project is designed to be:
- **Quick Setup**: Ready in under 10 minutes
- **Feature Complete**: All major visitor management features
- **Impressive Demo**: Professional UI with live updates
- **Scalable**: Easy to extend with real backend
- **Mobile Ready**: Works on tablets and phones

## 📄 License

This project is open source and available under the MIT License.

---

**Built for Innovation Incubators** 🚀  
*Streamline your visitor management with modern web technology*

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
