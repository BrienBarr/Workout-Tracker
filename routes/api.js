const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// router.put("/api/workouts/:id", (req, res) => {
//   Workout.findOneAndUpdate(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     {
//       $set: { body }
//     }
//   )
//   .then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//   .catch(err => {
//     res.status(400).json(err);
//   });
// });

// router.post("/api/workouts", ({ body }, res) => {
//   Workout.create(body)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });



module.exports = router;
