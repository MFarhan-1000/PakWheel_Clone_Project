const express = require("express")
const router = express.Router()

const jwt =  require("jsonwebtoken");

router.get("/", async (req,res)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).send({message: "NO token Your not Loggedin"})
        }

        if(token){
            const user = jwt.verify(token, process.env.JSONSCREATEKEY);
            req.user = user;
            return res.status(200).send(user)
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal server Error"})
    }

})

module.exports = router