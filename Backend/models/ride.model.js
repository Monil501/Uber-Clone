const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        default: null
    },
    pickup: {
        address: {
            type: String,
            required: true,
            minlength: [3, 'Pickup address must be at least 3 characters long']
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    destination: {
        address: {
            type: String,
            required: true,
            minlength: [3, 'Destination address must be at least 3 characters long']
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be at least 1']
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['uberGo', 'moto', 'auto']
    },
    status: {
        type: String,
        required: true,
        enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'requested'
    },
    distance: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

const rideModel = mongoose.model('ride', rideSchema);

module.exports = rideModel; 