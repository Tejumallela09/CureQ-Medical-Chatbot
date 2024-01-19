const connectDB = require("../config/db");
const userData = require("./users");
const User = require("../models/UserModel");
const importData = async () => {
  try {
    await connectDB();
    await User.collection.deleteMany({});
    await User.collection.insertMany(userData);
    console.log("Data import successful");
  } catch (error) {
    console.error("Error while processing seeder data", error);
  }
  // } finally {
  //   // Disconnect from the database after importing data
  //   await connectDB.disconnect();
  // }
};

// Export the importData function
module.exports = importData;

// Call the importData function if this script is run directly
if (require.main === module) {
  importData();
}
