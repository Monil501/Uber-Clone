import React from 'react'

const VehiclePanel = (props) => {
  const { estimatedPrice, estimatedTime } = props;
  
  // Calculate prices for different vehicle types
  const prices = {
    uberGo: estimatedPrice || 193,
    moto: Math.round((estimatedPrice || 193) * 0.33) || 65,
    auto: Math.round((estimatedPrice || 193) * 0.5) || 100
  };
  
  return (
    <div>
      <h5 
        className="p-1 text-center w-full absolute top-0 left-0" 
        onClick={() => {
          props.setVehiclePanel(false)
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      
      <div 
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehiclePanel(false)
        }} 
        className="flex border-2 border-white hover:border-black active:border-black mb-4 rounded-xl w-full p-4 items-center justify-between cursor-pointer"
      >
        <div className="flex-shrink-0 w-16">
          <img 
            className="h-12 w-auto object-contain" 
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" 
            alt="UberGo" 
          />
        </div>
        <div className="flex-grow mx-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-base">UberGo</h4>
            <span className="text-sm text-gray-600"><i className="ri-user-fill"></i> 4</span>
          </div>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
            {estimatedTime ? ` • ${estimatedTime} min` : ''}
          </p>
        </div>
        <div className="flex-shrink-0">
          <h2 className="text-xl font-semibold">₹{prices.uberGo}</h2>
        </div>
      </div>
      
      <div 
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehiclePanel(false)
        }} 
        className="flex border-2 border-white hover:border-black active:border-black mb-4 rounded-xl w-full p-4 items-center justify-between cursor-pointer"
      >
        <div className="flex-shrink-0 w-16">
          <img 
            className="h-12 w-auto object-contain" 
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" 
            alt="Moto" 
          />
        </div>
        <div className="flex-grow mx-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-base">Moto</h4>
            <span className="text-sm text-gray-600"><i className="ri-user-fill"></i> 1</span>
          </div>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
            {estimatedTime ? ` • ${Math.round(estimatedTime * 0.8)} min` : ''}
          </p>
        </div>
        <div className="flex-shrink-0">
          <h2 className="text-xl font-semibold">₹{prices.moto}</h2>
        </div>
      </div>
      
      <div 
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehiclePanel(false)
        }} 
        className="flex border-2 border-white hover:border-black active:border-black mb-4 rounded-xl w-full p-4 items-center justify-between cursor-pointer"
      >
        <div className="flex-shrink-0 w-16">
          <img 
            className="h-12 w-auto object-contain" 
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" 
            alt="Auto" 
          />
        </div>
        <div className="flex-grow mx-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-base">Auto</h4>
            <span className="text-sm text-gray-600"><i className="ri-user-fill"></i> 3</span>
          </div>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
            {estimatedTime ? ` • ${Math.round(estimatedTime * 0.9)} min` : ''}
          </p>
        </div>
        <div className="flex-shrink-0">
          <h2 className="text-xl font-semibold">₹{prices.auto}</h2>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-medium text-base mb-2">Payment</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-cash-line text-lg"></i>
            <span>Cash</span>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel
