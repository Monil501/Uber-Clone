import React from 'react'

const WaitingForDriver = (props) => {
  const { pickup, destination, price, estimatedTime, driverInfo } = props;
  
  return (
    <div>
      <h5
        className="p-1 text-center w-full absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          props.waitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-6">Captain is on the way</h3>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-green-50 p-4 rounded-lg w-full mb-6">
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
              <p className="text-sm text-gray-600">{driverInfo.car} • {driverInfo.plateNumber}</p>
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
              <p className="text-lg font-semibold text-blue-900">{estimatedTime < 5 ? '2-3' : Math.round(estimatedTime / 3)} minutes</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="ri-time-line text-blue-600 text-xl"></i>
            </div>
          </div>
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
      >
        Cancel Ride
      </button>
    </div>
  )
}

export default WaitingForDriver
