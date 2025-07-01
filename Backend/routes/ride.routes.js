const express = require('express');
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const { authUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// Book a ride
router.post('/book', 
    authUser,
    [
        body('pickup.address').isLength({ min: 3 }).withMessage('Pickup address must be at least 3 characters long'),
        body('pickup.lat').isNumeric().withMessage('Pickup latitude must be a number'),
        body('pickup.lng').isNumeric().withMessage('Pickup longitude must be a number'),
        body('destination.address').isLength({ min: 3 }).withMessage('Destination address must be at least 3 characters long'),
        body('destination.lat').isNumeric().withMessage('Destination latitude must be a number'),
        body('destination.lng').isNumeric().withMessage('Destination longitude must be a number'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('vehicleType').isIn(['uberGo', 'moto', 'auto']).withMessage('Invalid vehicle type'),
        body('distance').isNumeric().withMessage('Distance must be a number'),
        body('estimatedTime').isNumeric().withMessage('Estimated time must be a number')
    ],
    rideController.bookRide
);

// Get rides for logged in user
router.get('/user', authUser, rideController.getUserRides);

// Get rides for logged in captain
router.get('/captain', authUser, rideController.getCaptainRides);

// Update ride status
router.put('/status', 
    authUser,
    [
        body('rideId').isMongoId().withMessage('Invalid ride ID'),
        body('status').isIn(['requested', 'accepted', 'in_progress', 'completed', 'cancelled']).withMessage('Invalid status')
    ],
    rideController.updateRideStatus
);

// Assign captain to a ride
router.put('/assign-captain', 
    authUser,
    [
        body('rideId').isMongoId().withMessage('Invalid ride ID'),
        body('captainId').isMongoId().withMessage('Invalid captain ID')
    ],
    rideController.assignCaptain
);

module.exports = router; 