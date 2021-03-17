const router = require("express").Router();

router.get("/exercise", function(req, res){
  res.redirect("./exercise.html");
});

module.exports = router;