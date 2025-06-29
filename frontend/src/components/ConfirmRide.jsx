import React from "react";

const ConfirmRide = (props) => {
  const { pickup, destination, price, sendRequestToCaptains } = props;
  
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
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt="UberGo"
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
            sendRequestToCaptains();
          }} 
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Confirm UberGo
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
