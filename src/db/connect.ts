import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = () => {
  return mongoose.connect(process.env.MULTER_URL as string)
}

export default connectDB;