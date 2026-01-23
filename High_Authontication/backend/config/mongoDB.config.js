import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectedDB = await mongoose.connect(`${process.env.MONGODB_URL}/UserAuthentication`)
    console.log(`Database Connection Successful: ${connectedDB.connection.host}`)
  } catch (error) {
    console.log('Database Connection failed', error)
    process.exit(1)
  }
}
export default connectDB