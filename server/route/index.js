const express = require("express");
const router = express.Router();

const {valToken} = require("../middleware/auth");

router.get("/", valToken, (req, res) => {
  res.status(200).json({user: req.userData});
});

module.exports = router
