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
        
        // Transform the data to match what the frontend expects
        return captains.map(captain => {
            // Generate a random location near the pickup point for simulation
            const lat = pickupLocation.lat + (Math.random() - 0.5) * 0.01;
            const lng = pickupLocation.lng + (Math.random() - 0.5) * 0.01;
            
            // Calculate rough distance in km (simplified for demo)
            const distance = Math.sqrt(
                Math.pow(lat - pickupLocation.lat, 2) + 
                Math.pow(lng - pickupLocation.lng, 2)
            ) * 111; // Rough conversion to km
            
            // Calculate ETA in minutes (assuming 30 km/h average speed)
            const etaMinutes = Math.round((distance / 30) * 60);
            
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
            
            return {
                id: captain._id,
                name: `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`,
                rating: (4 + Math.random()).toFixed(1), // Random rating between 4.0 and 5.0
                car: vehicleDisplay,
                vehicleType: vehicleType,
                plateNumber: captain.vehicle.plate,
                distance: `${etaMinutes} min away`,
                lat: lat,
                lng: lng
            };
        });
    } catch (error) {
        throw new Error(`Error finding nearby captains: ${error.message}`);
    }
}