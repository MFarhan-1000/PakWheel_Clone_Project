const express = require("express")
const router = express.Router();

const User = require("../../Model/User")
const joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookiePerser = require("cookie-parser")

const loginValidation = joi.object({
    email: joi.required(),
    password: joi.required()
})

router.post("/", async (req,res)=>{
    try{
        
    const {error, value} = loginValidation.validate(req.body);

    if(error){
        return res.status(404).send({message: "error Please Check Your Email and Password"})
    }

    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).send({message: "Email Don't exists"})
    }

    const passwordString = String(password)
    const checkPassword = await bcrypt.compare(passwordString, user.password)
    const safeUser = user.toObject()
    delete safeUser.password;

    if(!checkPassword){
        return res.status(404).send({message: "Please Check Your Password"})
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    },
    process.env.JSONSCREATEKEY,
    {
        expiresIn: "1h"
    }
)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge :60 * 60 * 1000
    })

    res.status(200).send(safeUser)
    
    }catch(err){
        console.log(err)
        res.status(404).send({message: "Internal Server Error"})
    }

})


module.exports = router;