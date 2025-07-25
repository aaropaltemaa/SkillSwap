# SkillSwap

**Exchange Skills. Grow Together.**

SkillSwap is a modern web application that connects people to trade skills with each other. Users can list skills they offer and want to learn, get matched with complementary users, and coordinate skill exchanges through integrated messaging and request management.

> 🌐 **Live Application:** [https://skillswap-h8f0.onrender.com](https://skillswap-h8f0.onrender.com)

---

## ✨ Features

### Core Functionality

- **User Authentication:** Secure JWT-based registration and login system
- **Skill Matching:** Smart algorithm to match users based on complementary skills
- **Exchange Requests:** Send, receive, accept, or decline skill exchange proposals
- **Real-time Messaging:** Live chat system using Socket.IO for seamless communication
- **User Profiles:** Comprehensive profiles showcasing skills offered and wanted
- **Review System:** Rate and review completed skill exchanges
- **Discovery:** Search and filter users by skills, name, or compatibility

### User Experience

- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Real-time Updates:** Live notifications for messages and exchange requests
- **Intuitive Navigation:** Clean, professional interface with dropdown menus
- **Smart Filtering:** Advanced search capabilities with compatibility scoring

---

## 🛠 Tech Stack

<details>
<summary>Frontend</summary>

- **React 19** with Vite for fast development and modern features
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Socket.IO Client** for real-time communication
- **Axios** for HTTP requests
- **Framer Motion** for smooth animations
- **Headless UI** for accessible component primitives

</details>

<details>
<summary>Backend</summary>

- **Node.js** with Express.js for robust server-side logic
- **MongoDB** with Mongoose for flexible data modeling
- **Socket.IO** for real-time bidirectional communication
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

</details>

<details>
<summary>DevOps & Testing</summary>

- **Docker** containerization for consistent deployments
- **GitHub Actions** CI/CD pipeline with automated testing
- **Playwright** for comprehensive end-to-end testing
- **ESLint** for code quality and consistency
- **Render** for production deployment

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MongoDB instance (local or cloud)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/skillswap.git
   cd skillswap
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Configuration**

   - Create `.env` file in the `backend` directory:
     ```
     MONGODB_URI=mongodb://localhost:27017/skillswap
     TEST_MONGODB_URI=mongodb://localhost:27017/skillswap_test
     SECRET=your-jwt-secret-key
     PORT=3001
     ```
   - Create `.env` file in the `frontend` directory:
     ```
     VITE_SOCKET_URL=https://your-backend-url.com
     ```

4. **Start the application**

   ```bash
   # Start both frontend and backend concurrently
   npm run dev:all

   # Or start individually:
   # Backend (from backend directory)
   npm run dev

   # Frontend (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🧪 Testing

### End-to-End Tests

```bash
# Run Playwright e2e tests
npm run test:e2e

# View test report
npm run test:report
```

### Backend Unit Tests

```bash
cd backend
npm test
```

### Code Quality

```bash
# Lint backend
cd backend && npm run lint

# Lint frontend
cd frontend && npm run lint
```

---

## 📱 API Documentation

<details>
<summary>Authentication</summary>

- `POST /api/register` - Register new user
- `POST /api/login` - User login

</details>

<details>
<summary>Users</summary>

- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

</details>

<details>
<summary>Exchange Requests</summary>

- `POST /api/exchange-requests` - Create exchange request
- `GET /api/exchange-requests` - Get user's exchange requests
- `PUT /api/exchange-requests/:id/status` - Update request status

</details>

<details>
<summary>Messages</summary>

- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get conversation thread
- `GET /api/messages/threads` - Get all conversations

</details>

<details>
<summary>Reviews</summary>

- `POST /api/reviews` - Create review
- `GET /api/reviews/user/:userId` - Get reviews for user

</details>

---

## 🏗 Project Structure

```
skillswap/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── services/        # API service functions
│   │   └── App.jsx          # Main application component
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── utils/               # Utility functions and middleware
│   ├── tests/               # Unit tests
│   └── package.json
├── e2e-tests/               # Playwright end-to-end tests
├── .github/workflows/       # CI/CD pipeline configuration
└── README.md
```

---

## 🔄 CI/CD Pipeline

The application uses **GitHub Actions** for continuous integration and deployment:

- **Code Quality:** ESLint checks for both frontend and backend
- **Testing:** Unit tests and end-to-end tests with Playwright
- **Build:** Frontend build verification
- **Deployment:** Automatic deployment to Render on successful builds

---

## 🌟 Key Features Deep Dive

### Smart Skill Matching

- Compatibility scoring based on mutual skill interests
- Intelligent user suggestions prioritizing best matches
- Visual indicators for matching skills in user discovery

### Real-time Communication

- Instant messaging with Socket.IO
- Live updates for new exchange requests
- Real-time notification system

### Comprehensive User Profiles

- Skills offered and wanted management
- Bio and location information
- Member since date and activity status
- Direct action buttons for quick interactions

---

## 🚀 Deployment

The application is deployed on **Render** with the following configuration:

- **Frontend:** Static site deployment with SPA routing
- **Backend:** Node.js service with MongoDB Atlas
- **Environment:** Production-optimized builds with environment variables

---

## 📈 Development Timeline

| Date      | Hours | What I did                                                                                                           |
| --------- | ----- | -------------------------------------------------------------------------------------------------------------------- |
| 10.5.2025 | 1.5   | initialized app                                                                                                      |
| 15.5.2025 | 3     | added backend test routes and mongoose schemas for users                                                             |
| 16.5.2025 | 3     | added backend routes for exchange requests, registering, login + exchangerequest schema                              |
| 19.5.2025 | 6     | added functionality for messaging & getting chat history                                                             |
| 20.5.2025 | 6     | initialized frontend & finished backend                                                                              |
| 21.5.2025 | 2     | frontend configurations                                                                                              |
| 23.5.2025 | 8     | Nav bar, authentication (frontend), hero section, styles                                                             |
| 25.5.2025 | 4     | add exchange request page, myexchangerequests page, menu component                                                   |
| 6.6.2025  | 8     | started frontend again with tailwindcss                                                                              |
| 11.6.2025 | 3     | notifications and exchange form design                                                                               |
| 14.6.2025 | 4     | exchange request creation form + user exchange request page in frontend                                              |
| 19.6.2025 | 5     | frontend logic for accepting/rejecting requests, error handling for login                                            |
| 24.6.2025 | 5     | chat page, upcoming exchanges page, dropdown menu for navbar                                                         |
| 28.6.2025 | 4     | review modal design, headless ui installed                                                                           |
| 1.7.2025  | 5     | backend schema + routes for reviews, frontend logic for creating reviews                                             |
| 3.7.2025  | 4     | real time chat (WebSockets, Socket.IO)                                                                               |
| 4.7.2025  | 10    | user profiles, deployed app to internet, containerization with docker, CI/CD initial pipeline, E2E tests initialized |
| 19.7.2025 | 10    | more e2e tests, ci/cd configurations                                                                                 |
| 20.7.2025 | 2     | initial profile page design                                                                                          |
|           |       |                                                                                                                      |
|           |       |                                                                                                                      |
| **Total** |       |                                                                                                                      |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch:**  
   `git checkout -b feature/amazing-feature`
3. **Commit your changes:**  
   `git commit -m 'Add amazing feature'`
4. **Push to the branch:**  
   `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
