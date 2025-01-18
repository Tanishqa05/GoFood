const mongoose = require("mongoose");

// Store MongoDB URI in an environment variable for security
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://tani05bandi:tani5mongo@cluster-1.4fqi6.mongodb.net/firstdb?retryWrites=true&w=majority&appName=Cluster-1";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetch data from collections
    const fetched_data = mongoose.connection.db.collection("food_items");
    const food_items = await fetched_data.find({}).toArray();

    const food_category = mongoose.connection.db.collection("food_category");
    const food_categories = await food_category.find({}).toArray();

    // Store data in global variables
    global.food_items = food_items;
    global.food_category = food_categories;

    console.log("Data fetched and stored in global variables");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;
