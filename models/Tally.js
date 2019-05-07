const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
let TallySchema = new Schema({
    tally_name: {
        type: String
    },
    tally_time: {
        type: Date,
        default: Date.now
    },
    owner_id: {
      type: String
    },
    owner_name: {
      type: String
    }

});

module.exports = Tally = mongoose.model('tallies', TallySchema);
