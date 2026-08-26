const express = require("express")
const router = express.Router()

// Logout route

router.post("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });

  return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router