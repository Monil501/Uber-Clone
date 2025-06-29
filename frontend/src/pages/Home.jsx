import React, { useRef, useState, useEffect } from "react";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import GoogleMapComponent from "../components/GoogleMap";
import PlacesAutocomplete from "../components/PlacesAutocomplete";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [locationStep, setLocationStep] = useState(0); // 0: pick location, 1: dest location
  const [mapSelectionMode, setMapSelectionMode] = useState(null); // null, 'pickup', or 'destination'
  const [requestSent, setRequestSent] = useState(false); // Track if request has been sent to captains
  const [availableCaptains, setAvailableCaptains] = useState([]); // Track available captains
  const [selectedCaptain, setSelectedCaptain] = useState(null); // Track selected captain
  
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFounfRef = useRef(null);
  const waitingforDriverRef = useRef(null);
  
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Simulate request to captains
  const sendRequestToCaptains = () => {
    setRequestSent(true);
    setVehicleFound(true);
    setConfirmRidePanel(false);
    
    // Simulate API call to find nearby captains
    setTimeout(() => {
      // Simulate finding captains
      const mockCaptains = [
        {
          id: 1,
          name: "John Doe",
          rating: 4.8,
          car: "Toyota Camry",
          plateNumber: "AB 1234 CD",
          distance: "3 min away",
          lat: pickupLocation ? pickupLocation.lat + (Math.random() - 0.5) * 0.01 : 23.0225,
          lng: pickupLocation ? pickupLocation.lng + (Math.random() - 0.5) * 0.01 : 72.5714
        },
        {
          id: 2,
          name: "Jane Smith",
          rating: 4.9,
          car: "Honda Civic",
          plateNumber: "XY 5678 ZW",
          distance: "5 min away",
          lat: pickupLocation ? pickupLocation.lat + (Math.random() - 0.5) * 0.015 : 23.0235,
          lng: pickupLocation ? pickupLocation.lng + (Math.random() - 0.5) * 0.015 : 72.5724
        }
      ];
      
      setAvailableCaptains(mockCaptains);
      
      // Simulate captain accepting the ride
      setTimeout(() => {
        setSelectedCaptain(mockCaptains[0]);
        setVehicleFound(false);
        setWaitingForDriver(true);
        
        // Set driver location
        setDriverLocation({
          lat: mockCaptains[0].lat,
          lng: mockCaptains[0].lng
        });
      }, 5000); // Captain accepts after 5 seconds
    }, 2000); // Find captains after 2 seconds
  };

  // Cancel ride request
  const cancelRideRequest = () => {
    setRequestSent(false);
    setVehicleFound(false);
    setWaitingForDriver(false);
    setAvailableCaptains([]);
    setSelectedCaptain(null);
    setDriverLocation(null);
  };

  // Calculate estimated price based on distance between pickup and destination
  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      // Simple formula: base fare + distance * rate
      const R = 6371; // Earth's radius in km
      const dLat = (destinationLocation.lat - pickupLocation.lat) * Math.PI / 180;
      const dLon = (destinationLocation.lng - pickupLocation.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(pickupLocation.lat * Math.PI / 180) * Math.cos(destinationLocation.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distance in km
      
      const baseFare = 50;
      const rate = 15; // ₹15 per km
      const price = baseFare + (distance * rate);
      setEstimatedPrice(Math.round(price));
      
      // Estimate time (assuming average speed of 30 km/h)
      const timeInMinutes = (distance / 30) * 60;
      setEstimatedTime(Math.round(timeInMinutes));
    }
  }, [pickupLocation, destinationLocation]);

  const submitHandler = (e) => {
    e.preventDefault(); // if user can press enter without filling detail it will not submit the form
  };

  // gsap is use for animation purpose and this project it is use for click on panel it can move upwards
  useGSAP(function(){
     if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:20
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
     }else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:20
        // opacity:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
     }
  },[panelOpen])

  useGSAP(function(){
   if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
   }else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
   }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
     gsap.to(ConfirmRidePanelRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(ConfirmRidePanelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[confirmRidePanel])

   useGSAP(function(){
    if(vehicleFound){
     gsap.to(vehicleFounfRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(vehicleFounfRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[vehicleFound])

   useGSAP(function(){
    if(waitingForDriver){
     gsap.to(waitingforDriverRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(waitingforDriverRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[waitingForDriver])

  const handlePickupSelect = (location) => {
    setPickupLocation(location);
    setPickup(location.address);
    setLocationStep(1); // Move to destination selection
  };

  const handleDestinationSelect = (location) => {
    setDestinationLocation(location);
    setDestination(location.address);
    setPanelOpen(false);
    setVehiclePanel(true);
  };
  
  // Handle location selected from map click
  const handleMapLocationSelect = (location) => {
    if (mapSelectionMode === 'pickup') {
      setPickupLocation(location);
      setPickup(location.address);
      setMapSelectionMode('destination'); // Switch to destination selection mode after picking up
    } else if (mapSelectionMode === 'destination') {
      setDestinationLocation(location);
      setDestination(location.address);
      setMapSelectionMode(null); // Turn off map selection mode
      
      // If both locations are set, proceed to vehicle panel
      if (pickupLocation) {
        setVehiclePanel(true);
      }
    }
  };
  
  // Toggle map selection mode
  const toggleMapSelectionMode = (mode) => {
    setMapSelectionMode(prevMode => prevMode === mode ? null : mode);
  };
  
  // Handle manual entry of locations when fields are typed but not selected from dropdown
  const handleManualLocationEntry = async () => {
    if (pickup && destination && !vehiclePanel) {
      try {
        // If locations aren't already geocoded, try to geocode them
        if (!pickupLocation || !pickupLocation.lat) {
          const { getGeocode, getLatLng } = await import("use-places-autocomplete");
          try {
            const results = await getGeocode({ address: pickup });
            const { lat, lng } = await getLatLng(results[0]);
            setPickupLocation({
              address: pickup,
              lat,
              lng,
              formattedAddress: results[0]?.formatted_address || pickup
            });
          } catch (error) {
            console.error("Error geocoding pickup:", error);
            // Fallback to default coordinates
            setPickupLocation({
              address: pickup,
              lat: 23.0225,
              lng: 72.5714
            });
          }
        }
        
        if (!destinationLocation || !destinationLocation.lat) {
          const { getGeocode, getLatLng } = await import("use-places-autocomplete");
          try {
            const results = await getGeocode({ address: destination });
            const { lat, lng } = await getLatLng(results[0]);
            setDestinationLocation({
              address: destination,
              lat,
              lng,
              formattedAddress: results[0]?.formatted_address || destination
            });
          } catch (error) {
            console.error("Error geocoding destination:", error);
            // Fallback to default coordinates
            setDestinationLocation({
              address: destination,
              lat: 23.0400,
              lng: 72.5800
            });
          }
        }
        
        setVehiclePanel(true);
      } catch (error) {
        console.error("Error in manual entry:", error);
      }
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Map layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <GoogleMapComponent 
          pickup={pickupLocation} 
          destination={destinationLocation} 
          driverLocation={driverLocation}
          onMapClick={handleMapLocationSelect}
          selectionMode={mapSelectionMode}
        />
      </div>
      
      {/* Logo */}
      <div className="absolute left-5 top-5 z-50 pointer-events-auto">
        <img
          className="w-16 bg-white p-2 rounded-lg shadow-md"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
      </div>
      
      {/* Map Selection Controls */}
      {!waitingForDriver && !vehicleFound && !confirmRidePanel && !vehiclePanel && (
        <div className="absolute right-5 top-20 z-50 bg-white p-2 rounded-lg shadow-md pointer-events-auto">
          <button 
            className={`flex items-center justify-center p-2 rounded-full mb-2 ${mapSelectionMode === 'pickup' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => toggleMapSelectionMode('pickup')}
            title="Select pickup location from map"
          >
            <i className="ri-map-pin-user-fill text-xl"></i>
          </button>
          <button 
            className={`flex items-center justify-center p-2 rounded-full ${mapSelectionMode === 'destination' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
            onClick={() => toggleMapSelectionMode('destination')}
            title="Select destination from map"
          >
            <i className="ri-map-pin-2-fill text-xl"></i>
          </button>
        </div>
      )}
      
      {/* UI layer */}
      <div className="flex flex-col justify-end h-screen pointer-events-none absolute top-0 left-0 right-0 w-full z-20">
        <div className="h-auto min-h-[30%] bg-white shadow-lg p-6 relative pointer-events-auto rounded-t-xl">
          <h5 
            ref={panelCloseRef} 
            onClick={() => {
              setPanelOpen(false)
            }} 
            className="absolute opacity-0 top-6 right-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="relative"
          >
            <div className="line absolute h-16 w-1 top-[45%] left-4 bg-gray-900 rounded-full"></div>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute top-3 left-4 text-gray-500 z-10">
                  <i className="ri-map-pin-user-fill"></i>
                </div>
                <div className="pl-10">
                  <PlacesAutocomplete 
                    label=""
                    onSelectLocation={handlePickupSelect} 
                    placeholder="Add a pick-up location"
                    value={pickup}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute top-3 left-4 text-gray-500 z-10">
                  <i className="ri-map-pin-2-fill"></i>
                </div>
                <div className="pl-10">
                  <PlacesAutocomplete 
                    label=""
                    onSelectLocation={handleDestinationSelect} 
                    placeholder="Enter your destination"
                    value={destination}
                  />
                </div>
              </div>
            </div>
            
            {pickup && destination && (
              <button 
                onClick={handleManualLocationEntry}
                className="w-full mt-4 bg-black text-white py-3 rounded-lg font-medium text-lg shadow-md hover:bg-gray-800"
              >
                Search Rides
              </button>
            )}
          </form>
        </div>
        <div 
          ref={panelRef} 
          className="h-0 bg-white overflow-y-auto shadow-lg pointer-events-auto"
        >
          {locationStep === 0 ? (
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Enter pickup location</h3>
              <PlacesAutocomplete 
                label="Search for pickup location"
                onSelectLocation={handlePickupSelect} 
                placeholder="Search for pickup location"
                value={pickup}
              />
              <div className="flex items-center justify-between my-4">
                <h4 className="text-lg font-semibold">Or select from map</h4>
                <button 
                  onClick={() => toggleMapSelectionMode('pickup')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${mapSelectionMode === 'pickup' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  <i className="ri-map-pin-fill"></i>
                  {mapSelectionMode === 'pickup' ? 'Click on map' : 'From map'}
                </button>
              </div>
              <div className="mt-5">
                <h4 className="text-lg font-semibold mb-2">Saved Places</h4>
                <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg mb-2">
                  <i className="ri-home-4-line text-xl"></i>
                  <span>Home</span>
                </div>
                <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <i className="ri-building-line text-xl"></i>
                  <span>Work</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Enter destination</h3>
              <PlacesAutocomplete 
                label="Search for destination"
                onSelectLocation={handleDestinationSelect} 
                placeholder="Search for destination"
                value={destination}
              />
              <div className="flex items-center justify-between my-4">
                <h4 className="text-lg font-semibold">Or select from map</h4>
                <button 
                  onClick={() => toggleMapSelectionMode('destination')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${mapSelectionMode === 'destination' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                  <i className="ri-map-pin-fill"></i>
                  {mapSelectionMode === 'destination' ? 'Click on map' : 'From map'}
                </button>
              </div>
            </div>
          )}
        </div>      
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-50 bg-white bottom-0 translate-y-full px-4 py-10 pt-12 shadow-lg rounded-t-3xl">
          <VehiclePanel 
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehiclePanel={setVehiclePanel}
            estimatedPrice={estimatedPrice}
            estimatedTime={estimatedTime} 
          /> 
      </div> 
      <div ref={ConfirmRidePanelRef} className="fixed w-full z-50 bg-white bottom-0 translate-y-full px-4 py-6 pt-12 shadow-lg rounded-t-3xl">
          <ConfirmRide 
            setConfirmRidePanel={setConfirmRidePanel}
            sendRequestToCaptains={sendRequestToCaptains}
            pickup={pickup}
            destination={destination}
            price={estimatedPrice} 
          />
      </div>
      <div ref={vehicleFounfRef} className="fixed w-full z-50 bg-white bottom-0 translate-y-full px-4 py-6 pt-12 shadow-lg rounded-t-3xl">
              <LookingForDriver 
                setVehicleFound={cancelRideRequest}
                pickup={pickup}
                destination={destination}
                price={estimatedPrice} 
              />
      </div>
      <div ref={waitingforDriverRef} className="fixed w-full z-50 bg-white bottom-0 translate-y-full px-4 py-6 pt-12 shadow-lg rounded-t-3xl">
              <WaitingForDriver 
                waitingForDriver={waitingForDriver}
                pickup={pickup}
                destination={destination}
                price={estimatedPrice}
                estimatedTime={estimatedTime}
                driverInfo={selectedCaptain || {
                  name: "John Doe",
                  rating: 4.8,
                  car: "Toyota Camry",
                  plateNumber: "AB 1234 CD"
                }}
              />
      </div>
    </div>
  );
};

export default Home;