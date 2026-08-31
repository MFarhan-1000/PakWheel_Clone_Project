const jwt = require("jsonwebtoken")
const User = require("../Model/User")

const auth_Middleware = async (req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).send({message : "UnAuthorized"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JSONSCREATEKEY);
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err)
        res.status(401).send({message: "Access Denied"})
    }

}

module.exports = auth_Middleware;