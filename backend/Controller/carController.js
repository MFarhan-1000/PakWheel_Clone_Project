const express = require("express");

const User = require("../Model/User");
const Car = require("../Model/Car");

const cloudinary = require("cloudinary").v2;
const cookies = require("cookie-parser");
const joi = require("joi");

const carValidation = joi.object({
  title: joi.string().required(),
  make: joi.required(),
  model: joi.required(),
  status: joi.required().optional,
  vehicalType: joi.required(),
  price: joi.number().required(),
  catagory: joi.required(),
  city:joi.required(),
  year: joi.required(),
});

// /////////////////////
// Creating car listings
// /////////////////////
const createCar = async (req, res) => {
  try {
    const { error, value } = carValidation.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).send({ message: "Please Check Your Details" });
    }

    if(!req.file){
      return res.status(400).send({message: "No image found"});
    }
    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;

    const image = req.file;
    console.log(image)

    const allData = {
      ...value,
      salesPerson: req.user.id,
      image: {
        url: imageUrl,
        publicId: imagePublicId,
      },
    }

    console.log(allData);
    const car = await Car.create(allData)
    res.send("Car Listing created Successfully");
    
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getCar = async (req,res)=>{
  try{
    const {keyword, minPrice, make,maxPrice,city,vehicalType ,catagory,page=1,limit=6,} = req.query;

    const query = {}
    if(catagory){
      query.catagory = { $regex: `${catagory}`, $options: "i"}
    }

    if(make){
      query.make = {$regex: `${make}`, $options: "i"}
    }

    if(vehicalType){
      query.vehicalType = {$regex: `${vehicalType}`, $options: "i"}
    }

    if(keyword){
      query.$or=[
        {title:{$regex:keyword, $options:"i"}},
        {make: {$regex: keyword, $options: "i"}},
        {model: {$regex: keyword, $options: "i"}}
      ]
    }

    if(city){
      query.city = {$regex: city, $options: "i"}
    }

    if(minPrice || maxPrice){
      query.price= {};
        if(maxPrice) query.price.$lte = Number(maxPrice)
        if(minPrice) query.price.$gte = Number(minPrice)
    }

    const pageNum = Number(page)
    const limitNum = Number(limit)
    const skip = (pageNum - 1) * limitNum;

    const totalCar = await Car.countDocuments(query)
    
    const Cars = await Car.find(query)
    .populate("salesPerson", "name phone")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limitNum)

    res.status(200).send({
      Cars,
      totalCar,
      currentPage: pageNum,
      totalPages: Math.ceil(totalCar / limitNum)
    })

  }catch(err){
    console.log(err)
    return res.status(500).send({message:"internal server error", err})
  }
}

// ///////////////////
// Get Cars details
// //////////////////

const detailCar = async (req,res)=>{
  try{

    const {id} = req.params;

    const allDetails = await Car.findById(id)

    if(!allDetails){
      return res.status(403).send({message: "Please Try Again Details Not Found"})
    }

    res.status(200).send(allDetails)

  }catch(err){
    return res.status(500).send({message: "Internal Server Error", err})
  }
  
}


// ////////////
// Update 
// ///////////

const updatedCar = async (req,res)=>{
  try{ 
    const {id} = req.params;
    const {title, make, model, price, year, vehicalType, city} = req.body;    
    
    const getCar = await Car.findById(id)

    const allUpdatedData = {title, make, model, price, year, vehicalType, city};
    
    if(!getCar){
      return res.status(404).send({message: "Car Not Found"})
    }

    const CarUpdated =await Car.findByIdAndUpdate(id, {$set:{
      title: title,
      make: make,
      model:model,
      price:price,
      city: city,
      year:year,
      vehicalType: vehicalType
    }},
  {
    runValidators: true,
    returnDocument: 'after'
  })

    res.status(200).send(CarUpdated);

  }catch(err){
    console.log(err)
    return res.status(500).send({message: "Internal Server Error", err})
  }
}

// ///////////////
// Get my listing
// //////////////
const getMyListings = async (req, res) => {
  try {
    const userid = req.user._id || req.user.id;
    const cars = await Car.find({ salesPerson: userid }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// //////////////
//  Deleting cars
// //////////////
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    const carId = req.params.id;

    const userid = req.user.id.toString();
    const salesperson = car.salesPerson.toString();

    const isOwner = salesperson === userid;

    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    if(car.image && car.image.publicId){
      await cloudinary.uploader.destroy(car.image.publicId)
    }
 
    const delCar = await Car.findByIdAndDelete(carId)

    res.status(200).send({message: "Car listing Deleted", delCar})

} catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createCar, getCar, detailCar,updatedCar ,getMyListings, deleteCar };