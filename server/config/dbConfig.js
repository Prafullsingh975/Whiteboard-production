const mongoose = require('mongoose');

const connectDb = async(url)=>{
    try {
        await mongoose.connect(url);
        console.log("Connected to DB");  
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = connectDb;