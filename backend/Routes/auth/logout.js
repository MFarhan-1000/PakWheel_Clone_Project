const express = require("express")
const router = express.Router()

// Logout route

router.post("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router