import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (can be adjusted based on user's location)
const center = {
  lat: 23.0225,  // Default to India coordinates
  lng: 72.5714
};

function GoogleMapComponent({ pickup, destination, driverLocation, onMapClick, selectionMode }) {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const directionsService = useRef(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const geocoder = useRef(null);

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setIsApiLoaded(true);
        console.log("Google Maps API loaded successfully");
      } else {
        // If not loaded yet, check again in 500ms
        setTimeout(checkGoogleMapsLoaded, 500);
      }
    };

    // Handle API loading error
    const handleScriptError = () => {
      console.error("Failed to load Google Maps API");
      setLoadError(new Error("Failed to load Google Maps API"));
    };

    // Check if API key is configured
    const checkApiKey = () => {
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      if (scripts.length === 0) {
        console.error("No Google Maps API script found");
        setLoadError(new Error("No Google Maps API script found. Please check your API key configuration."));
        return false;
      }
      
      // Check if any script has the API key
      for (const script of scripts) {
        const src = script.getAttribute('src');
        if (src && src.includes('key=') && !src.includes('key=YOUR_API_KEY')) {
          return true;
        }
      }
      
      console.error("Google Maps API key not properly configured");
      setLoadError(new Error("Google Maps API key not properly configured"));
      return false;
    };

    // Add error handler for the script
    const scriptElements = document.querySelectorAll('script[src*="maps.googleapis.com"]');
    if (scriptElements.length > 0) {
      scriptElements.forEach(script => {
        script.addEventListener('error', handleScriptError);
      });
    } else {
      // No script found, check if it's included in the index.html
      checkApiKey();
    }

    // Start checking if API is loaded
    checkGoogleMapsLoaded();

    // Set a timeout to stop checking after 10 seconds
    const timeout = setTimeout(() => {
      if (!isApiLoaded) {
        setLoadError(new Error("Google Maps API loading timed out. Please check your API key and network connection."));
      }
    }, 10000);

    return () => {
      if (scriptElements.length > 0) {
        scriptElements.forEach(script => {
          script.removeEventListener('error', handleScriptError);
        });
      }
      clearTimeout(timeout);
    };
  }, []);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    setMap(map);
    
    // Initialize the directions service
    if (window.google && window.google.maps) {
      directionsService.current = new window.google.maps.DirectionsService();
      geocoder.current = new window.google.maps.Geocoder();
      
      // Enable draggable map
      map.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false
      });
    }
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
    setMap(null);
  }, []);

  // Custom zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  const handleRecenter = () => {
    if (mapRef.current) {
      if (pickup) {
        mapRef.current.panTo({ lat: pickup.lat, lng: pickup.lng });
      } else {
        mapRef.current.panTo(center);
      }
      mapRef.current.setZoom(14);
    }
  };

  // Handle map click to place a marker
  const handleMapClick = useCallback((event) => {
    if (!onMapClick || !selectionMode) return;
    
    try {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      setClickedLocation({ lat, lng });
      
      // Get address from coordinates using geocoder
      if (geocoder.current) {
        geocoder.current.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            
            // Pass the location back to the parent component
            onMapClick({
              lat,
              lng,
              address,
              formattedAddress: address
            });
          } else {
            console.error("Geocoder failed due to: " + status);
            // Still pass coordinates even if geocoding failed
            onMapClick({
              lat, 
              lng,
              address: `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
              formattedAddress: `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            });
          }
        });
      } else {
        console.warn("Geocoder not available, using coordinates only");
        onMapClick({
          lat, 
          lng,
          address: `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          formattedAddress: `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`
        });
      }
    } catch (error) {
      console.error("Error handling map click:", error);
      if (onMapClick) {
        // Try to recover with event coordinates if available
        try {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onMapClick({
            lat, 
            lng,
            address: `Selected location`,
            formattedAddress: `Selected location`
          });
        } catch (e) {
          console.error("Could not extract coordinates from click event:", e);
        }
      }
    }
  }, [onMapClick, selectionMode]);

  // Fit bounds to markers when map, pickup, or destination changes
  useEffect(() => {
    if (mapRef.current && pickup && destination) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: pickup.lat, lng: pickup.lng });
        bounds.extend({ lat: destination.lat, lng: destination.lng });
        
        if (driverLocation) {
          bounds.extend({ lat: driverLocation.lat, lng: driverLocation.lng });
        }
        
        mapRef.current.fitBounds(bounds);
        
        // Adjust zoom if too close
        const listener = window.google.maps.event.addListener(mapRef.current, 'idle', () => {
          if (mapRef.current && mapRef.current.getZoom() > 16) {
            mapRef.current.setZoom(16);
          }
          window.google.maps.event.removeListener(listener);
        });
      } catch (error) {
        console.error("Error adjusting map bounds:", error);
      }
    } else if (mapRef.current && pickup) {
      try {
        mapRef.current.panTo({ lat: pickup.lat, lng: pickup.lng });
        mapRef.current.setZoom(14);
      } catch (error) {
        console.error("Error panning to pickup:", error);
      }
    }
  }, [pickup, destination, driverLocation]);

  // Calculate and display route when pickup and destination are set
  useEffect(() => {
    if (isApiLoaded && directionsService.current && pickup && destination) {
      try {
        directionsService.current.route(
          {
            origin: { lat: pickup.lat, lng: pickup.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
              setDirections(null);
            }
          }
        );
      } catch (error) {
        console.error("Error calculating route:", error);
        setDirections(null);
      }
    } else {
      setDirections(null);
    }
  }, [isApiLoaded, pickup, destination]);

  // If there's an error loading the Google Maps script
  if (loadError) {
    return (
      <div className="h-full w-full bg-red-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-red-500 max-w-md">
          <h3 className="font-bold text-lg mb-2">Google Maps Error</h3>
          <p className="mb-4">Error loading Google Maps: {loadError.message}</p>
          
          <div className="bg-yellow-50 p-4 rounded-md text-sm">
            <h4 className="font-bold mb-2">How to fix:</h4>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Create a proper Google Maps API key at <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Console</a></li>
              <li>Enable these APIs: Maps JavaScript API, Places API, Directions API, Geocoding API</li>
              <li>Enable billing for your project (required even for free tier)</li>
              <li>Create a .env file in the frontend directory with:<br/>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-1">
                  VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
                </code>
              </li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // If still loading
  if (!isApiLoaded) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        <p className="ml-4">Loading Maps...</p>
      </div>
    );
  }

  // Render the map
  return (
    <div className="h-full w-full relative" ref={mapContainerRef}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          gestureHandling: 'auto',
          scrollwheel: true,
          disableDoubleClickZoom: false,
          clickableIcons: true,
          draggable: true,
          keyboardShortcuts: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {/* Display directions if available */}
        {directions && <DirectionsRenderer 
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#4285F4',
              strokeWeight: 5
            },
            suppressMarkers: false
          }}
        />}
        
        {/* Display pickup location if available and directions not shown */}
        {pickup && !directions && (
          <Marker
            position={{ lat: pickup.lat, lng: pickup.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : null,
            }}
            onClick={() => setSelectedMarker({ type: 'pickup', ...pickup })}
          />
        )}
        
        {/* Display destination location if available and directions not shown */}
        {destination && !directions && (
          <Marker
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : null,
            }}
            onClick={() => setSelectedMarker({ type: 'destination', ...destination })}
          />
        )}
        
        {/* Display driver location if available */}
        {driverLocation && (
          <Marker
            position={{ lat: driverLocation.lat, lng: driverLocation.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/cabs.png',
              scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : null,
            }}
            onClick={() => setSelectedMarker({ type: 'driver', ...driverLocation })}
          />
        )}

        {/* Display clicked location marker when in selection mode */}
        {selectionMode && clickedLocation && (
          <Marker
            position={{ lat: clickedLocation.lat, lng: clickedLocation.lng }}
            icon={{
              url: selectionMode === 'pickup' 
                ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' 
                : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : null,
            }}
          />
        )}

        {/* Display info window for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1">
              <h3 className="font-medium text-sm">
                {selectedMarker.type === 'pickup' ? 'Pickup' : 
                 selectedMarker.type === 'destination' ? 'Destination' : 'Driver'}
              </h3>
              <p className="text-xs">{selectedMarker.address || selectedMarker.formattedAddress || 'Location'}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Custom map controls */}
      <div className="absolute left-4 bottom-20 z-10 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl hover:bg-gray-100"
          aria-label="Zoom in"
        >
          <i className="ri-add-line"></i>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl hover:bg-gray-100"
          aria-label="Zoom out"
        >
          <i className="ri-subtract-line"></i>
        </button>
        <button 
          onClick={handleRecenter}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl hover:bg-gray-100"
          aria-label="Recenter map"
        >
          <i className="ri-focus-2-line"></i>
        </button>
      </div>
    </div>
  );
}

export default React.memo(GoogleMapComponent); 