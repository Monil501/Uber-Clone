import React, { useEffect, useState } from "react";

const ConfirmRide = (props) => {
  const { pickup, destination, price, bookRide } = props;
  const [vehicleType, setVehicleType] = useState('uberGo');
  const [vehicleImage, setVehicleImage] = useState('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png');
  
  // Get vehicle type from sessionStorage when component mounts
  useEffect(() => {
    const storedVehicleType = sessionStorage.getItem('selectedVehicleType') || 'uberGo';
    setVehicleType(storedVehicleType);
    
    // Set the appropriate image based on vehicle type
    if (storedVehicleType === 'moto') {
      setVehicleImage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png');
    } else if (storedVehicleType === 'auto') {
      setVehicleImage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png');
    }
  }, []);
  
  // Get the display name for the vehicle type
  const getVehicleDisplayName = () => {
    if (vehicleType === 'moto') return 'Moto';
    if (vehicleType === 'auto') return 'Auto';
    return 'UberGo';
  };
  
  return (
    <div>
      <h5
        className="p-1 text-center w-full absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="flex justify-center w-full">
          <img
            className="h-20 object-contain"
            src={vehicleImage}
            alt={getVehicleDisplayName()}
          />
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
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
              <i className="ri-coupon-2-line"></i>
              <span className="text-sm">Apply Coupon</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            bookRide(vehicleType);
          }} 
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Confirm {getVehicleDisplayName()}
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
