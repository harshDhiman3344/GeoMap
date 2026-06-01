const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MONGO CONNECTED');
    }
    catch(err){
        console.error('MongoDB failed to connect',err)
        process.exit(1);
    }

};

module.exports = connectDB;


