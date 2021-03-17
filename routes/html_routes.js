const router = require("express").Router();

router.get("/exercise", function(req, res){
  res.redirect("./exercise.html");
});

router.get("/stats", function(req, res){
  res.redirect("./stats.html");
});

module.exports = router;