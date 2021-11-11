const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gender: {
    type: String
  },
  
  location: {
    type: String
  }
});
module.exports = mongoose.model('Profile', profileSchema);