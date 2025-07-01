const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');

const bookRide = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, price, vehicleType, distance, estimatedTime } = req.body;
        
        // Create ride data object with user ID from authenticated user
        const rideData = {
            user: req.user._id,
            pickup,
            destination,
            price,
            vehicleType,
            distance,
            estimatedTime,
            status: 'requested'
        };
        
        const ride = await rideService.createRide(rideData);
        
        res.status(201).json({
            message: 'Ride booked successfully',
            ride
        });
    } catch (error) {
        console.error('Error booking ride:', error);
        res.status(500).json({ message: error.message });
    }
};

const getUserRides = async (req, res) => {
    try {
        const userId = req.user._id;
        const rides = await rideService.getRidesByUser(userId);
        
        res.status(200).json({ rides });
    } catch (error) {
        console.error('Error getting user rides:', error);
        res.status(500).json({ message: error.message });
    }
};

const getCaptainRides = async (req, res) => {
    try {
        const captainId = req.user._id;
        const rides = await rideService.getRideByCaptain(captainId);
        
        res.status(200).json({ rides });
    } catch (error) {
        console.error('Error getting captain rides:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateRideStatus = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, status } = req.body;
        const ride = await rideService.updateRideStatus(rideId, status);
        
        res.status(200).json({
            message: 'Ride status updated successfully',
            ride
        });
    } catch (error) {
        console.error('Error updating ride status:', error);
        res.status(500).json({ message: error.message });
    }
};

const assignCaptain = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, captainId } = req.body;
        const ride = await rideService.assignCaptainToRide(rideId, captainId);
        
        res.status(200).json({
            message: 'Captain assigned to ride successfully',
            ride
        });
    } catch (error) {
        console.error('Error assigning captain to ride:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookRide,
    getUserRides,
    getCaptainRides,
    updateRideStatus,
    assignCaptain
}; 