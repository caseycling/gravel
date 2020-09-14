const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiderSchema = new Schema({
  rider_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  driver: {
    type: Boolean,
    default: false,
  },
  start_location: {
    type: String,
    required: true,
  },
  end_location: {
    type: String,
    required: false,
  },
  leaving_date: {
    type: Date,
    required: true,
  },
  flexible_date: {
    type: Boolean,
    default: false,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
  seats_available: {
    type: Number,
    required: true,
  },
  smoking: {
    type: Boolean,
    required: true,
  },
  luggage: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
