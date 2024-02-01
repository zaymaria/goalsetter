const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Goal = new Schema({
    goal_description: {
        type: String
    },
    goal_sphere: {
        type: String
    },
    goal_priority: {
        type: String
    },
    goal_timeframe: {
        type: String
    },
    goal_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model("Goal", Goal);

