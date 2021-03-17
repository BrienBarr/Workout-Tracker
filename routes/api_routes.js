const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
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
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  } else {
    res.redirect("./exercise.html");
  }
});

router.put("/api/workouts/:id", (req, res) => {
  // console.log(body);
  if (req.params.id === "undefined"){
    createWorkout(req.body, res);
  } else{
    Workout.updateOne(
      {
        _id: req.params.id
      },
      {exercises: {$push: {body}}}
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  }
});

router.post("/api/workouts", ({ body }, res) => {
  // console.log(body);
  createWorkout(body, res);
});

function createWorkout(data, res){
  console.log(data);
  Workout.create(data)
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
}

module.exports = router;
