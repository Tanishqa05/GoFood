const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tani05bandi:tani5mongo@cluster-1.4fqi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
