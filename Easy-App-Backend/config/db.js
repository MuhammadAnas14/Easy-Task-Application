const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://dbSaad:fypsaad@fypeasyapp.s9fn7.mongodb.net/EasyApp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongodb connected:${conn.connection.host}`);
};

// const connectDB = async () => {
//   const conn = await mongoose.connect("mongodb://dbSaad:fypsaad@fypeasyapp-shard-00-00.s9fn7.mongodb.net:27017,fypeasyapp-shard-00-01.s9fn7.mongodb.net:27017,fypeasyapp-shard-00-02.s9fn7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mlevmy-shard-0&authSource=admin&retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log(`mongodb connected:${conn.connection.host}`);
// };

// const connectDB = async () => {
//   const conn = await mongoose.connect("mongodb://localhost:27017/EasyApp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log(`mongodb connected:${conn.connection.host}`);
// };


module.exports = connectDB;

