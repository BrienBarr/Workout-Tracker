const router = require("express").Router();
const path = require('path');

router.get("/exercise", function(req, res){
  res.sendFile(path.join(__dirname, '../public', 'exercise.html'));
  // res.redirect("./exercise.html");
});

router.get("/stats", function(req, res){
  res.redirect("./stats.html");
});

module.exports = router;