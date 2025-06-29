import React, { useState, useEffect, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import GoogleMapComponent from '../components/GoogleMap';
import axios from 'axios';

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [earnings, setEarnings] = useState({ today: 0, week: 0, month: 0 });
  const [stats, setStats] = useState({ totalRides: 0, rating: 4.8, completionRate: 98 });
  
  // Backend API URL
  const API_URL = 'http://localhost:3000';

  // Get captain's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Your current location"
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default location (India)
          setCurrentLocation({
            lat: 23.0225,
            lng: 72.5714,
            address: "Default location"
          });
        }
      );
    }
  }, []);

  // Simulate ride requests
  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        const shouldGenerateRequest = Math.random() > 0.7; // 30% chance of getting a request
        
        if (shouldGenerateRequest && !activeRide && rideRequests.length < 3) {
          const newRequest = generateRideRequest();
          setRideRequests(prev => [...prev, newRequest]);
          
          // Play notification sound
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.play().catch(e => console.log("Audio play failed:", e));
        }
      }, 15000); // Check every 15 seconds
      
      return () => clearInterval(interval);
    }
  }, [isOnline, activeRide, rideRequests]);

  // Generate a random ride request
  const generateRideRequest = () => {
    const pickupLocations = [
      { address: "Navrangpura, Ahmedabad", lat: 23.0367, lng: 72.5662 },
      { address: "Satellite, Ahmedabad", lat: 23.0333, lng: 72.5167 },
      { address: "Bopal, Ahmedabad", lat: 23.0395, lng: 72.4588 }
    ];
    
    const destinationLocations = [
      { address: "Maninagar, Ahmedabad", lat: 22.9987, lng: 72.6011 },
      { address: "Airport, Ahmedabad", lat: 23.0747, lng: 72.6342 },
      { address: "Gandhinagar", lat: 23.2156, lng: 72.6369 }
    ];
    
    const pickup = pickupLocations[Math.floor(Math.random() * pickupLocations.length)];
    const destination = destinationLocations[Math.floor(Math.random() * destinationLocations.length)];
    
    // Calculate distance between points
    const R = 6371; // Earth's radius in km
    const dLat = (destination.lat - pickup.lat) * Math.PI / 180;
    const dLon = (destination.lng - pickup.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pickup.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    
    const baseFare = 50;
    const rate = 15; // ₹15 per km
    const price = baseFare + (distance * rate);
    const estimatedTime = Math.round((distance / 30) * 60); // Assuming 30 km/h average speed
    
    return {
      id: Date.now().toString(),
      user: {
        name: ["Rahul", "Priya", "Amit", "Sneha", "Raj"][Math.floor(Math.random() * 5)],
        rating: (4 + Math.random()).toFixed(1)
      },
      pickup,
      destination,
      price: Math.round(price),
      estimatedTime,
      distance: distance.toFixed(1),
      createdAt: new Date()
    };
  };

  // Accept a ride request
  const acceptRideRequest = (request) => {
    setActiveRide(request);
    setRideRequests(prev => prev.filter(req => req.id !== request.id));
  };

  // Decline a ride request
  const declineRideRequest = (requestId) => {
    setRideRequests(prev => prev.filter(req => req.id !== requestId));
  };

  // Complete active ride
  const completeRide = () => {
    // Update earnings
    setEarnings(prev => ({
      ...prev,
      today: prev.today + activeRide.price,
      week: prev.week + activeRide.price,
      month: prev.month + activeRide.price
    }));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalRides: prev.totalRides + 1
    }));
    
    // Clear active ride
    setActiveRide(null);
  };

  // Toggle online status
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Coming online, clear any old requests
      setRideRequests([]);
    }
  };

  // Check if captain is logged in
  useEffect(() => {
    if (!captain && !localStorage.getItem('token')) {
      navigate('/captain-login');
    }
  }, [captain, navigate]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              className="w-10 h-10 mr-2" 
              src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
              alt="Uber Driver" 
            />
            <h1 className="text-xl font-bold">Uber Captain</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-3">
              {captain ? `${captain.fullname?.firstname || 'Captain'}` : 'Captain'}
            </span>
            <button 
              onClick={() => navigate('/captain-logout')}
              className="p-2 rounded-full hover:bg-gray-700"
            >
              <i className="ri-logout-box-line"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Map Section */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
          {currentLocation && (
            <GoogleMapComponent 
              pickup={currentLocation} 
              destination={activeRide?.destination}
              driverLocation={currentLocation}
            />
          )}
          
          {/* Online/Offline Toggle */}
          <div className="absolute top-4 right-4 z-10 bg-white rounded-full shadow-lg p-2">
            <button 
              onClick={toggleOnlineStatus}
              className={`px-4 py-2 rounded-full font-medium ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto bg-white shadow-lg">
          {/* Active Ride */}
          {activeRide && (
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold mb-2">Current Ride</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="ri-user-line text-blue-500"></i>
                  </div>
                  <div>
                    <p className="font-medium">{activeRide.user.name}</p>
                    <div className="flex items-center text-sm">
                      <i className="ri-star-fill text-yellow-500 mr-1"></i>
                      <span>{activeRide.user.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start mb-2">
                    <div className="mt-1 mr-2">
                      <i className="ri-map-pin-user-fill text-green-500"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p className="text-sm">{activeRide.pickup.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-2">
                      <i className="ri-map-pin-2-fill text-red-500"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Destination</p>
                      <p className="text-sm">{activeRide.destination.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Distance</p>
                    <p className="font-medium">{activeRide.distance} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Est. Time</p>
                    <p className="font-medium">{activeRide.estimatedTime} min</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fare</p>
                    <p className="font-medium">₹{activeRide.price}</p>
                  </div>
                </div>
                
                <button 
                  onClick={completeRide}
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-medium"
                >
                  Complete Ride
                </button>
              </div>
            </div>
          )}

          {/* Ride Requests */}
          {isOnline && !activeRide && (
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold mb-2">
                Ride Requests 
                {rideRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {rideRequests.length}
                  </span>
                )}
              </h2>
              
              {rideRequests.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <i className="ri-search-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Waiting for ride requests...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rideRequests.map(request => (
                    <div key={request.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                            <i className="ri-user-line text-gray-600"></i>
                          </div>
                          <span className="font-medium">{request.user.name}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-500 mr-1"></i>
                          <span>{request.user.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mb-2 text-sm">
                        <p className="flex items-center">
                          <i className="ri-map-pin-user-fill text-green-500 mr-1"></i>
                          <span className="truncate">{request.pickup.address}</span>
                        </p>
                        <p className="flex items-center">
                          <i className="ri-map-pin-2-fill text-red-500 mr-1"></i>
                          <span className="truncate">{request.destination.address}</span>
                        </p>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Distance</p>
                          <p className="font-medium">{request.distance} km</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Est. Time</p>
                          <p className="font-medium">{request.estimatedTime} min</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Fare</p>
                          <p className="font-medium">₹{request.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptRideRequest(request)}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => declineRideRequest(request.id)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Earnings */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-3">Earnings</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Today</p>
                <p className="text-lg font-bold">₹{earnings.today}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">This Week</p>
                <p className="text-lg font-bold">₹{earnings.week}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">This Month</p>
                <p className="text-lg font-bold">₹{earnings.month}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Statistics</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Total Rides</p>
                <p className="text-lg font-bold">{stats.totalRides}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Rating</p>
                <div className="flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-500 mr-1"></i>
                  <p className="text-lg font-bold">{stats.rating}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Completion</p>
                <p className="text-lg font-bold">{stats.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;