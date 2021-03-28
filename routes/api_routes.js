const router = require("express").Router();
// const Workout = require("../models/workout.js");
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
    { $sort: { day: -1 } },
    { $limit: 1}
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

let exercises = [];

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  console.log("Request body: " + JSON.stringify(req.body));
});

router.post("/api/workouts", (req, res) => {
  createWorkout(req.body, res);
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
    { $sort: { day: -1 } },
    { $limit: 7}
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

function createWorkout(data, res){
  console.log("data: " + JSON.stringify(data));
  db.Workout.create({})
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
}

module.exports = router;
