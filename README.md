# <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Clone Logo" width="40"> Uber Clone

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Clone Logo" width="300px">
  <h3><em>A full-stack ride-hailing application with real-time driver tracking</em></h3>
  
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Google Maps API](https://img.shields.io/badge/Google_Maps_API-Latest-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-screenshots">Screenshots</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-setup-guide">Setup Guide</a> •
    <a href="#-api-documentation">API</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

## ✨ Features

<table>
  <tr>
    <td>
      <h3>🔐 User & Captain Authentication</h3>
      <p>Secure signup/login for both riders and drivers</p>
    </td>
    <td>
      <h3>🗺️ Real-time Location Tracking</h3>
      <p>Track drivers in real-time on the map</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🚗 Multiple Vehicle Options</h3>
      <p>Choose from economy, premium, or XL rides</p>
    </td>
    <td>
      <h3>💰 Ride Estimation</h3>
      <p>Price and time estimates based on distance</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>👨‍✈️ Captain Selection</h3>
      <p>Select from available drivers in your area</p>
    </td>
    <td>
      <h3>📱 Responsive Design</h3>
      <p>Works seamlessly on mobile and desktop</p>
    </td>
  </tr>
</table>

## 🖼️ Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Home Screen</strong></td>
      <td align="center"><strong>Location Search</strong></td>
    </tr>
    <tr>
      <td><img src="./screenshots/Screenshot 2025-07-01 142342.png" width="400px" alt="Home Screen"></td>
      <td><img src="./screenshots/Screenshot 2025-07-01 142426.png" width="400px" alt="Location Search"></td>
    </tr>
    <tr>
      <td align="center"><strong>Vehicle Selection</strong></td>
      <td align="center"><strong>Looking for Captains</strong></td>
    </tr>
    <tr>
      <td><img src="./screenshots/Screenshot 2025-07-01 142507.png" width="400px" alt="Vehicle Selection"></td>
      <td><img src="./screenshots/Screenshot 2025-07-01 142519.png" width="400px" alt="Looking for Captains"></td>
    </tr>
    <tr>
      <td align="center"><strong>Captain Selection</strong></td>
      <td align="center"><strong>Captain on the Way</strong></td>
    </tr>
    <tr>
      <td><img src="./screenshots/Screenshot 2025-07-01 142529.png" width="400px" alt="Captain Selection"></td>
      <td><img src="./screenshots/Screenshot 2025-07-01 143122.png" width="400px" alt="Captain on the Way"></td>
    </tr>
  </table>
</div>

## 🛠️ Tech Stack

<details open>
<summary><b>Frontend</b></summary>
<br>

- **React 19** - Latest React with hooks and context API
- **Vite** - Fast and efficient build tool
- **Tailwind CSS** - For styling with utility-first approach
- **GSAP** - For smooth animations and transitions
- **Google Maps API** - For maps and location services
- **Places Autocomplete** - For address search and suggestions
- **React Router DOM** - For navigation and routing
- **Axios** - For HTTP requests

</details>

<details open>
<summary><b>Backend</b></summary>
<br>

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - For secure authentication
- **bcrypt** - For password hashing
- **Express Validator** - For request validation

</details>

## 📖 Setup Guide

<details open>
<summary><b>Prerequisites</b></summary>
<br>

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)
- [Git](https://git-scm.com/downloads)
- A code editor (like [VS Code](https://code.visualstudio.com/))
- A Google Maps API key with these APIs enabled:
  - Maps JavaScript API
  - Places API
  - Directions API
  - Distance Matrix API

</details>

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

### Step 2: Set Up Backend

1. **Navigate to the backend directory**:
   ```bash
   cd Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the Backend directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   
   > 💡 **Tip**: For local MongoDB, use `MONGODB_URI=mongodb://localhost:27017/uber-clone`

4. **Start the backend server**:
   ```bash
   node server.js
   ```
   
   > You should see a message like: `Server running on port 5000` and `Connected to MongoDB`

### Step 3: Set Up Frontend

1. **Open a new terminal window** and navigate to the project root, then to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the frontend directory with the following content:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_URL=http://localhost:5000
   ```

   > 🔑 **Important**: Get your Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)

4. **Start the frontend development server**:
   ```bash
   npm run dev
   ```
   
   > This will launch the app at `http://localhost:5173`

### Step 4: Google Maps API Setup

1. **Create a Google Cloud account** if you don't have one
2. **Create a new project** in the Google Cloud Console
3. **Enable the required APIs**:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API
4. **Create API credentials**:
   - Go to "Credentials" → "Create credentials" → "API key"
   - Copy the key and add it to your frontend `.env` file
5. **Set up API restrictions** (recommended):
   - Go to the API key settings
   - Add restrictions based on HTTP referrers (websites)
   - Add `localhost:5173/*` for development

### Step 5: Testing the Application

1. **Register a new user account**:
   - Navigate to the signup page
   - Enter your details
   - You'll be redirected to the home page after successful signup

2. **Book a ride**:
   - Enter pickup and destination locations
   - Select vehicle type
   - Confirm ride
   - Select a captain from the available options
   - Track the captain's arrival

3. **Test captain features** (optional):
   - Register a new captain account
   - Log in as a captain
   - View available ride requests
   - Accept ride requests

## 🌟 User Flow

1. **User Registration/Login**
   - Create an account or log in as a rider
   - Alternatively, register/login as a captain (driver)

2. **Booking a Ride**
   - Enter pickup location and destination
   - Select vehicle type
   - Review price and time estimate
   - Confirm ride request

3. **Finding a Captain**
   - View available captains nearby
   - Select preferred captain

4. **Ride Tracking**
   - Real-time captain location on map
   - Status updates as captain approaches
   - Arrival notification when captain reaches pickup

## 📝 API Documentation

<details>
<summary><b>User Endpoints</b></summary>
<br>

- `POST /users/register` - Register a new user
- `POST /users/login` - Log in an existing user
- `GET /users/profile` - Get user profile information
- `GET /users/logout` - Log out user and invalidate token

</details>

<details>
<summary><b>Captain Endpoints</b></summary>
<br>

- `POST /captains/register` - Register a new captain
- `POST /captains/login` - Log in an existing captain
- `GET /captains/profile` - Get captain profile information
- `GET /captains/logout` - Log out captain and invalidate token

</details>

For detailed API documentation, see [Backend/README.md](./Backend/README.md)

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Google Maps API](https://developers.google.com/maps)
- [Tailwind CSS](https://tailwindcss.com/)
- [Remixicon](https://remixicon.com/)
- [Uber](https://uber.com) for inspiration

---

<div align="center">
  <p>Made with ❤️ by Monil Modi</p>
</div> 