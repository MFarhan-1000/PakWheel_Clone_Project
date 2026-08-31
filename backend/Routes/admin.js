const express = require("express")
const router = express.Router()
const auth_Middleware = require("../Middleware/authMiddleware")


router.get("/", auth_Middleware, async (req,res)=>{
    try{
        if(!req.user){
            return res.status(404).send({message: "No user found"})
        }
        if(req.user.role !== "admin"){
            return res.status(403).send({message: "UnAuthorized"})
        }

        res.status(200).send({message: "User is admin"})

    }catch(err){
        return res.status(500).send({message : "Internal server error"})
    }
})

module.exports = router