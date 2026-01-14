import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL || process.env.MONGODB_URL || "mongodb://localhost:27017/CRUD_Operation";
    const connectingDB = await mongoose.connect(mongoURL)

    console.log(`Database Connection Successfully : ${connectingDB.connection.host}`)
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
}

export default connectDB