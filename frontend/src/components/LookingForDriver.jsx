import React, { useState, useEffect } from 'react';

const LookingForDriver = (props) => {
  const { pickup, destination, price } = props;
  const [searchTime, setSearchTime] = useState(0);
  
  // Simulate searching time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <h5
        className="p-1 text-center w-full absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-6">Looking for nearby captains</h3>
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 mb-2">Searching for available captains...</p>
        <p className="text-sm text-gray-500 mb-8">
          {searchTime < 5 ? 'Sending ride request to captains nearby' : 
           searchTime < 10 ? 'Waiting for captain to accept your ride' : 
           'Still looking for the best captain for you'}
        </p>
        
        {searchTime > 15 && (
          <div className="bg-yellow-50 p-4 rounded-md mb-6 w-full">
            <p className="text-sm text-yellow-700">
              Taking longer than usual. High demand in your area.
            </p>
          </div>
        )}
      </div>
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