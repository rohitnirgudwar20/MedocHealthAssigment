import mongoose from 'mongoose';
import dotenv from 'dotenv';


 dotenv.config();


require("dotenv").config();

const dbConnect = async() =>{
    try {
     await mongoose.connect(process.env.DATABASE_URL as string)
    console.log("Db connection is Succcessful")

    }
    catch(error){
        console.log("Issue in DB Connecction");
        process.exit(1);
    }

}

// module.exports = dbConnect;
export default dbConnect;

