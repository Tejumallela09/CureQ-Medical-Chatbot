// specialist.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Other specialist properties...

  // Array of health conditions the specialist can cure
  conditions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCondition',
    },
  ],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
