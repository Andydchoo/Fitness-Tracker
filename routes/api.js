const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post("/api/workouts", ({ body }, res) => {

    Workout.create(body)
        .then(workout => {
            res.json(workout);
        }).catch(err => {
            res.json(err);
        })
});

router.get('/api/workouts', ({ body }, res) => {
    Workout.aggregate([
        { 
            $addFields: {
                addDuration: {
                    $sum: "$excercise.duration"
                }
            }
        }
    ])
    .then(result => {
        res.json(result);
    }) 
    .catch(err => {
        res.json(err);
    })
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        { 
            $push: {
                "excercise": {
                    type: req.body.type,
                    name: req.body.name,
                    distance: req.body.distance,
                    duration: req.body.duration, 
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets
                }
            }
        },
        { safe: true, new: true }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }
);
});

router.get("/api/workouts/range", ({ body }, res) => {
    Workout.aggregate([
        {
            $addFields: {
                addDuration: {
                    $sum: "$exercise.duration"
                }
            }
        }
    ])
    .then(result => {
        res.json(result);
    }) .catch(err => {
        res.json(err);
    });
});

module.exports = router;