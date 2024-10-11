
const mongoose = require("mongoose")


const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://satishrella111:FGCIphzAkpwZgqrY@namastenode.ogzph.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
