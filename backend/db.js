const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tani05bandi:tani5mongo@cluster-1.4fqi6.mongodb.net/firstdb?retryWrites=true&w=majority&appName=Cluster-1';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch the food_items collection
        const fetched_data = mongoose.connection.db.collection("food_items");

        // Use `await` with the MongoDB query
        const data = await fetched_data.find({}).toArray();
        // console.log(data);

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
