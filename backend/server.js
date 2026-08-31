const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(express.json())

app.use(cors({
  origin: process.env.FRONTEND_PORT,
  credentials: true,
}));


app.use(cookieParser())

require("dotenv").config()
const PORT = process.env.PORT

const DB = require("./Config/DB")

// Routes require here
const signupRoute = require("./Routes/auth/signup")
const loginRoute = require("./Routes/auth/login")
const logoutRoute = require("./Routes/auth/logout")

// check user login and logout
const authLogincheckRoute = require("./Routes/authCheck")

// check admin
const admin = require("./Routes/admin")

// Car Route import 
const carRoute = require("./Routes/Car/CarListing")

// Route here
// Auth
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use("/logout", logoutRoute)

// Auth User Login Check
app.use("/api/me", authLogincheckRoute);

// Admin check
app.use("/isadmin", admin)

// car route here
app.use("/car", carRoute)



// Listen Port and DB 
DB().then(()=>{
    console.log("Db connected successfully")
    app.listen(PORT || 3000,()=>{
    console.log(`Port is Working `)
})
}).catch((err)=>{
    console.log(err)
})
