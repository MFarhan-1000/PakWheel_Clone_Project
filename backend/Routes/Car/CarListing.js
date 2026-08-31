const Car = require("../../Controller/carController")
const express = require("express")
const router = express.Router();

const auth_Middleware = require("../../Middleware/authMiddleware")

// importing Cloudinary upload??
const upload = require("../../Config/Cloudinary")


// Get all car or by filter 
router.get("/getcar", Car.getCar)

// create car 
router.post("/create", auth_Middleware, upload.single("image") ,Car.createCar)

// getting my Listing
router.get("/mylistings",auth_Middleware, Car.getMyListings)

// get cars details
router.get("/:id", auth_Middleware, Car.detailCar)

// Updating car
router.patch("/edit/:id", auth_Middleware, Car.updatedCar)

// deleting cars
router.delete("/delete/:id",auth_Middleware ,Car.deleteCar)


module.exports = router;
