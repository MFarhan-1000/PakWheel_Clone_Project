const { required } = require("joi");
const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
    title: {type: String, required: true},
    salesPerson: {type: mongoose.Schema.Types.ObjectId, ref: "User" , required:true},
    model: {type: String, required: true},
    make:{type: String, required: true},
    vehicalType: {type: String, enum:["car", "bike"], default: "car" },
    price: {type: Number, required: true},
    city:{type: String, required:true},
    catagory: {type: String, required:true},
    year: {type: Number},
    status: {type: String, enum:["active", "pending", "sold"]},
    image: {
        url:{
            type: String,
            required:true,
        },
        publicId:{
            type: String,
            required: true
        }
    }

})

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;