import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB is connected successfully`);
  } catch (error) {
    console.error(`ERROR, ${error.message}`);
    process.exit(1);
  }
};
