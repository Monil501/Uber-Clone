import React, { useState, useEffect } from 'react';

const LookingForDriver = (props) => {
  const { pickup, destination, price, setVehicleFound, availableCaptains, onCaptainSelect } = props;
  const [searchTime, setSearchTime] = useState(0);
  const [searchStatus, setSearchStatus] = useState('Sending ride request to captains nearby');
  const [showCaptains, setShowCaptains] = useState(false);
  
  // Simulate searching time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearInterval(timer);
      // Reset search time when component unmounts
      setSearchTime(0);
    };
  }, []);
  
  // Update search status message based on time
  useEffect(() => {
    if (searchTime < 5) {
      setSearchStatus('Sending ride request to captains nearby');
    } else if (searchTime < 10) {
      setSearchStatus('Waiting for captain to accept your ride');
    } else if (searchTime < 15) {
      setSearchStatus('Still looking for the best captain for you');
    } else {
      setSearchStatus('Expanding search to find you a ride');
    }
    
    // Show available captains after some time
    if (searchTime > 8 && availableCaptains && availableCaptains.length > 0) {
      setShowCaptains(true);
    }
  }, [searchTime, availableCaptains]);
  
  // Helper function to get the vehicle display name
  const getVehicleDisplayName = (vehicleType) => {
    switch (vehicleType) {
      case 'uberGo':
        return 'UberGo';
      case 'moto':
        return 'Bike';
      case 'auto':
        return 'Auto';
      default:
        return 'Vehicle';
    }
  };
  
  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <h5
        className="p-1 text-center w-full absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      
      {showCaptains ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Available Captains</h3>
          <p className="text-gray-600 mb-4">Select a captain to request a ride:</p>
          
          <div className="space-y-4 mb-6">
            {availableCaptains.map(captain => (
              <div 
                key={captain.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors"
                onClick={() => onCaptainSelect(captain)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                    <i className="ri-user-3-line text-2xl text-gray-500"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{captain.name}</h3>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-500"></i>
                        <span className="text-sm ml-1">{captain.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {captain.car} • {captain.plateNumber}
                      {captain.vehicleType && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                          {getVehicleDisplayName(captain.vehicleType)}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{captain.distance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-6"></div>
          <h3 className="text-2xl font-semibold mb-3">Looking for nearby captains</h3>
          <p className="text-gray-600 mb-2">Searching for available captains...</p>
          <p className="text-sm text-gray-500 mb-8">
            {searchStatus}
          </p>
          
          {searchTime > 15 && !showCaptains && (
            <div className="bg-yellow-50 p-4 rounded-md mb-6 w-full">
              <p className="text-sm text-yellow-700">
                Taking longer than usual. High demand in your area.
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-4 border-b border-gray-200">
          <div className="text-lg text-gray-600">
            <i className="ri-map-pin-user-fill"></i>
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm text-gray-600 truncate">
              {pickup || "562/11-A, kankariya talab, Ahemdabad"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-4 border-b border-gray-200">
          <div className="text-lg text-gray-600">
            <i className="ri-map-pin-2-fill"></i>
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm text-gray-600 truncate">
              {destination || "562/11-A, kankariya talab, Ahemdabad"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-5">
            <div className="text-lg text-gray-600">
              <i className="ri-cash-fill"></i>
            </div>
            <div>
              <h3 className="text-lg font-medium">₹{price || 193}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => props.setVehicleFound(false)}
        className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
      >
        Cancel Ride
      </button>
    </div>
  )
}

export default LookingForDriver