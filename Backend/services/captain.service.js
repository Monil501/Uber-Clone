const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}

// Find nearby captains based on pickup location
module.exports.findNearbyCaptains = async (pickupLocation) => {
    try {
        // In a real-world application, you would use geospatial queries to find captains near the pickup location
        // For example, if you have location data stored with GeoJSON, you could use $near or $geoWithin
        
        // For now, we'll just return all active captains as a simple implementation
        const captains = await captainModel.find({ status: 'active' });
        
        // If no active captains, create a mock captain for demo purposes
        if (!captains || captains.length === 0) {
            console.log('No active captains found, creating mock captain for demo');
            
            // Create a mock captain with a location near the pickup point
            const mockCaptain = {
                _id: 'mock-captain-1',
                fullname: {
                    firstname: 'Demo',
                    lastname: 'Driver'
                },
                vehicle: {
                    color: 'White',
                    plate: 'DL01AB1234',
                    capacity: 4,
                    vehicleType: 'car'
                },
                status: 'active'
            };
            
            return [{
                id: mockCaptain._id,
                name: `${mockCaptain.fullname.firstname} ${mockCaptain.fullname.lastname || ''}`,
                rating: '4.8',
                car: 'Toyota Camry',
                vehicleType: 'uberGo',
                plateNumber: mockCaptain.vehicle.plate,
                distance: '3 min away',
                lat: pickupLocation.lat + 0.005,
                lng: pickupLocation.lng + 0.005
            }];
        }
        
        // Transform the data to match what the frontend expects
        return captains.map(captain => {
            // Use a consistent, deterministic location calculation based on captain ID
            // This avoids random locations while still providing different positions for different captains
            const captainIdSum = captain._id.toString()
                .split('')
                .reduce((sum, char) => sum + char.charCodeAt(0), 0);
            
            // Use the captain ID to generate a consistent offset (but different for each captain)
            const latOffset = (captainIdSum % 20 - 10) / 1000; // Range: -0.01 to 0.01
            const lngOffset = ((captainIdSum * 13) % 20 - 10) / 1000; // Different pattern, same range
            
            // Apply the offset to the pickup location
            const lat = pickupLocation.lat + latOffset;
            const lng = pickupLocation.lng + lngOffset;
            
            // Calculate rough distance in km (simplified for demo)
            const distance = Math.sqrt(
                Math.pow(lat - pickupLocation.lat, 2) + 
                Math.pow(lng - pickupLocation.lng, 2)
            ) * 111; // Rough conversion to km
            
            // Calculate ETA in minutes (assuming 30 km/h average speed)
            const etaMinutes = Math.max(1, Math.round((distance / 30) * 60));
            
            // Map vehicle types from backend to frontend
            let vehicleDisplay;
            let vehicleType;
            
            switch(captain.vehicle.vehicleType) {
                case 'car':
                    vehicleDisplay = 'Toyota Camry';
                    vehicleType = 'uberGo';
                    break;
                case 'motorcycle':
                    vehicleDisplay = 'Honda Activa';
                    vehicleType = 'moto';
                    break;
                case 'auto':
                    vehicleDisplay = 'Auto Rickshaw';
                    vehicleType = 'auto';
                    break;
                default:
                    vehicleDisplay = 'Vehicle';
                    vehicleType = 'uberGo';
            }
            
            // Use actual rating if available, otherwise default to 4.5
            const rating = captain.rating ? captain.rating.toFixed(1) : '4.5';
            
            return {
                id: captain._id,
                name: `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`,
                rating: rating,
                car: vehicleDisplay,
                vehicleType: vehicleType,
                plateNumber: captain.vehicle.plate,
                distance: `${etaMinutes} min away`,
                lat: lat,
                lng: lng
            };
        });
    } catch (error) {
        console.error(`Error finding nearby captains: ${error.message}`);
        // Return an empty array instead of throwing an error
        return [];
    }
}