import React, { useState, useEffect, useRef } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({ 
  label, 
  placeholder, 
  onSelectLocation, 
  value, 
  defaultValue = '' 
}) => {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(defaultValue || value || '');
  const [hasManuallySelected, setHasManuallySelected] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsApiLoaded(true);
      } else {
        // If not loaded yet, check again in 500ms
        setTimeout(checkGoogleMapsLoaded, 500);
      }
    };

    checkGoogleMapsLoaded();
  }, []);

  // Only initialize usePlacesAutocomplete when API is loaded
  const {
    ready,
    value: autocompleteValue,
    suggestions: { status, data },
    setValue: setAutocompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'in' }, // Restrict to India
    },
    debounce: 300,
    initOnMount: isApiLoaded, // Only initialize when API is loaded
    cache: 86400,
  });

  useEffect(() => {
    // Update the autocomplete value when the input value changes from parent
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
      setAutocompleteValue(value);
    }
  }, [value, setAutocompleteValue]);

  useEffect(() => {
    // Set default value on initial load if provided
    if (defaultValue && !inputValue) {
      setInputValue(defaultValue);
      setAutocompleteValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = async (suggestion) => {
    try {
      // When a suggestion is clicked
      const address = suggestion.description;
      setInputValue(address);
      setHasManuallySelected(true);
      
      // Clear suggestions after selection
      clearSuggestions();

      // Get latitude and longitude from the selected address
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      
      // Call the parent component with the selected location
      onSelectLocation({
        address,
        lat,
        lng,
        placeId: suggestion.place_id,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setAutocompleteValue(newValue);
    setHasManuallySelected(false);
    
    // Only reset the parent's location if the user clears the field
    if (newValue === '') {
      onSelectLocation(null);
    }
  };

  // When user presses enter without selecting a suggestion
  const handleInputKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue && !hasManuallySelected && data[0]) {
      e.preventDefault();
      await handleSelect(data[0]);
    }
  };

  // If API is not loaded, show a simple input without autocomplete
  if (!isApiLoaded) {
    return (
      <div className="mb-0 relative w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        )}
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full text-base border-gray-300 rounded-md p-3"
        />
      </div>
    );
  }

  return (
    <div className="mb-0 relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        disabled={!ready}
        placeholder={placeholder}
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full text-base border-gray-300 rounded-md p-3"
      />
      
      {/* Suggestions dropdown */}
      {status === "OK" && inputValue && (
        <ul 
          ref={dropdownRef}
          className="absolute z-50 bg-white w-full border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto"
        >
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li
                key={place_id}
                onClick={() => handleSelect(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <strong className="block text-sm">{main_text}</strong>
                <span className="text-xs text-gray-500">{secondary_text}</span>
              </li>
            );
          })}
        </ul>
      )}
      
      {/* No results message */}
      {status === "ZERO_RESULTS" && inputValue && (
        <div className="absolute z-50 bg-white w-full border border-gray-300 rounded-md mt-1 shadow-lg p-4 text-center text-gray-500">
          No locations found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete; 