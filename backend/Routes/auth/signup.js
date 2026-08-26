const express = require("express");
const router = express.Router();

const User = require("../../Model/User");
const joi = require("joi");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookiePerser = require("cookie-parser")

// JOi Validation schema here
const signupSchema = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().required(),
  password: joi.required(),
  phone: joi.required(),
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: "Incomplete Data" });
    }

    const { email } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .send({ message: "User with this email already exits" });
    }

    const password = String(req.body.password);
    const securePassword = await bcrypt.hash(password, 10)
    
    // Saving User in DB
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: securePassword
    })

    // Deleting User password
    const safeUser = await user.toObject();
    delete safeUser.password;
    console.log(safeUser)

    // JWt token created here
    const token = jwt.sign({
        id: safeUser._id,
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    },
    process.env.JSONSCREATEKEY,
    {   
      "expiresIn": "1h" 
    })

    res.cookie("token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
    });


    res.status(200).send(safeUser)

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;

