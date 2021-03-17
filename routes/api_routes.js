const router = require("express").Router();
const Workout = require("../models/workout.js");
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate().addFields({totalDuration: { $sum: "$exercises.duration" } });
  Workout.find({})
    .sort({ day: -1 })
    .limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/exercise", (req, res) => {
  console.log(req.query.id);
  if(req.query.id){
    Workout.findOne(
      {
      _id: req.query.id
      }
    )
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
      // res.redirect("./exercise")
    })
    .catch(err => {
      res.status(400).json(err);
    });
  } else {
    res.redirect("./exercise.html");
  }
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  if (req.params.id === "undefined"){
    createWorkout(req.body, res);
  } else {
    Workout.updateOne(
      {
        _id: req.params.id
      },
      {exercises: {$push: {body}}}
    )
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  }
});

router.post("/api/workouts", ({body}, res) => {
  // console.log(body);
  createWorkout(body, res);
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({ day: -1 })
  .limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

function createWorkout(data, res){
  console.log(data);
  Workout.create({exercises: [data]})
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
}

module.exports = router;
