const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  // name: {
  //   type: String
  // }
  day: {
    type: Date,
    default: Date.now(),
    required: true
  },
  exercises:  [{
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number
    },
    reps: {
      type: Number
    },
    sets: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
