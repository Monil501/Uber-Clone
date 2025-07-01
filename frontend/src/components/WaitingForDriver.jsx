import React, { useState, useEffect } from 'react'

const WaitingForDriver = (props) => {
  const { pickup, destination, price, estimatedTime, driverInfo, setWaitingForDriver } = props;
  const [status, setStatus] = useState('accepted');
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime || 5);
  
  // Simulate driver status updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus('arrived');
          return 0;
        }
        return prev - 1;
      });
    }, 3000);
    
    // Update driver status based on time
    const statusTimer = setTimeout(() => {
      setStatus('approaching');
      
      // After some more time, update to nearby
      setTimeout(() => {
        setStatus('nearby');
      }, 9000);
    }, 6000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
    };
  }, []);
  
  // Get status message
  const getStatusMessage = () => {
    switch (status) {
      case 'accepted':
        return 'Your captain has accepted your request';
      case 'approaching':
        return 'Your captain is heading to pickup location';
      case 'nearby':
        return 'Your captain is almost at pickup location';
      case 'arrived':
        return 'Your captain has arrived at pickup location';
      default:
        return 'Your captain is on the way';
    }
  };
  
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
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-6">Captain is on the way</h3>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-green-50 p-4 rounded-lg w-full mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-600">{getStatusMessage()}</span>
            {status === 'arrived' && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Arrived
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <i className="ri-user-3-line text-3xl text-gray-500"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{driverInfo.name}</h3>
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-500"></i>
                  <span className="text-sm ml-1">{driverInfo.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {driverInfo.car} • {driverInfo.plateNumber}
                {driverInfo.vehicleType && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    {getVehicleDisplayName(driverInfo.vehicleType)}
                  </span>
                )}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                  <i className="ri-phone-line text-green-600"></i>
                </button>
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                  <i className="ri-message-2-line text-blue-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800">Estimated arrival</p>
              <p className="text-lg font-semibold text-blue-900">
                {status === 'arrived' ? 'Captain has arrived' : `${timeRemaining} minutes`}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="ri-time-line text-blue-600 text-xl"></i>
            </div>
          </div>
          {status !== 'arrived' && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(1 - timeRemaining / estimatedTime) * 100}%` }}
              ></div>
            </div>
          )}
        </div>
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
        className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
        onClick={() => setWaitingForDriver(false)}
      >
        Cancel Ride
      </button>
    </div>
  )
}

export default WaitingForDriver
