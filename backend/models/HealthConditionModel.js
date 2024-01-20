// healthCondition.js
const mongoose = require('mongoose');

const healthConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Other health condition properties...
});

const HealthCondition = mongoose.model('HealthCondition', healthConditionSchema);

module.exports = HealthCondition;
