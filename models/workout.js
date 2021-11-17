const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: { 
        type: Date,
        default: Date.now
    },
    excercises: [
        { 
            _id: false,
            type: {
                type: String,
                require: "Please enter your workout type"
            },
            name: {
                type: String, 
                require: "Please include a name for the excercises"
            },
            duration: {
                type: Number,
                require: 'Please enter the length of your workout'
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            distance: {
                type: Number
            },
        }
    ]
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;