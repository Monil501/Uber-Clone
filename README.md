# 🚗 Uber Clone

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Clone Logo" width="300px">
  <p><em>A full-stack ride-hailing application with real-time driver tracking</em></p>
  
  ![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite)
  ![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
  ![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-47A248?style=flat-square&logo=mongodb)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-06B6D4?style=flat-square&logo=tailwindcss)
  ![Google Maps API](https://img.shields.io/badge/Google_Maps_API-Latest-4285F4?style=flat-square&logo=googlemaps)
</div>

## 📱 Features

- **User & Captain Authentication** - Secure signup/login for both riders and drivers
- **Real-time Location Tracking** - Track drivers in real-time on the map
- **Google Maps Integration** - Interactive maps with location search
- **Ride Estimation** - Price and time estimates based on distance
- **Multiple Vehicle Options** - Choose from economy, premium, or XL rides
- **Captain Selection** - Select from available drivers in your area
- **Live Status Updates** - Follow your ride's status from request to arrival
- **Responsive Design** - Works seamlessly on mobile and desktop

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

### Frontend
- **React 19** - Latest React with hooks and context API
- **Vite** - Fast and efficient build tool
- **Tailwind CSS** - For styling with utility-first approach
- **GSAP** - For smooth animations and transitions
- **Google Maps API** - For maps and location services
- **Places Autocomplete** - For address search and suggestions
- **React Router DOM** - For navigation and routing
- **Axios** - For HTTP requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - For secure authentication
- **bcrypt** - For password hashing
- **Express Validator** - For request validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uber-clone.git
   cd uber-clone
   ```

2. **Set up the backend**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development servers**
   
   For the backend:
   ```bash
   cd Backend
   node server.js
   ```

   For the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application

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

### User Endpoints
- `POST /users/register` - Register a new user
- `POST /users/login` - Log in an existing user
- `GET /users/profile` - Get user profile information
- `GET /users/logout` - Log out user and invalidate token

### Captain Endpoints
- `POST /captains/register` - Register a new captain
- `POST /captains/login` - Log in an existing captain
- `GET /captains/profile` - Get captain profile information
- `GET /captains/logout` - Log out captain and invalidate token

For detailed API documentation, see [Backend/README.md](./Backend/README.md)

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices
- Tablets
- Desktop browsers

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