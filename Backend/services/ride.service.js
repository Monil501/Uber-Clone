const Ride = require('../models/ride.model');

const createRide = async (rideData) => {
    try {
        const ride = new Ride(rideData);
        await ride.save();
        return ride;
    } catch (error) {
        throw new Error(`Error creating ride: ${error.message}`);
    }
};

const getRidesByUser = async (userId) => {
    try {
        const rides = await Ride.find({ user: userId }).sort({ createdAt: -1 });
        return rides;
    } catch (error) {
        throw new Error(`Error getting user rides: ${error.message}`);
    }
};

const getRideByCaptain = async (captainId) => {
    try {
        const rides = await Ride.find({ captain: captainId }).sort({ createdAt: -1 });
        return rides;
    } catch (error) {
        throw new Error(`Error getting captain rides: ${error.message}`);
    }
};

const updateRideStatus = async (rideId, status) => {
    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            throw new Error('Ride not found');
        }
        
        ride.status = status;
        
        if (status === 'completed') {
            ride.completedAt = new Date();
        }
        
        await ride.save();
        return ride;
    } catch (error) {
        throw new Error(`Error updating ride status: ${error.message}`);
    }
};

const assignCaptainToRide = async (rideId, captainId) => {
    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            throw new Error('Ride not found');
        }
        
        ride.captain = captainId;
        ride.status = 'accepted';
        
        await ride.save();
        return ride;
    } catch (error) {
        throw new Error(`Error assigning captain to ride: ${error.message}`);
    }
};

module.exports = {
    createRide,
    getRidesByUser,
    getRideByCaptain,
    updateRideStatus,
    assignCaptainToRide
}; 