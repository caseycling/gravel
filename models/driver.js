const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  driver: {
    type: Boolean,
    default: true,
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
    default: false,
    required: true,
  },
  luggage: {
    type: Boolean,
    default: false,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  rider_id: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
