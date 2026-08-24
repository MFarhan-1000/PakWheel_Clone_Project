const mongoose = require("mongoose")

const mongoose_url = process.env.MONGOOSE_URL;

function main(){
    return mongoose.connect(mongoose_url)
}

module.exports = main;