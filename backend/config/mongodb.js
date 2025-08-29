import mongoose from "mongoose"

const connectDB = async () => {

  mongoose.connection.on('connected', async () => {
    console.log("DB Connected")
  })

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message)
    process.exit(1)
  }
}

export default connectDB
