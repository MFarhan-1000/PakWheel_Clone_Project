const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")


const auth_Middleware = (req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).send({message : "UnAuthorized"})
    }
    try{
        const user = jwt.verify(token, process.env.JSONSCREATEKEY);
        req.user = user;
        next();
    }catch(err){
        console.log(err)
        res.status(500).send({message: "Access Denied"})
    }

}

module.exports = auth_Middleware;