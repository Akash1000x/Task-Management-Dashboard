import mongoose from "mongoose";

/**
 * Connect to the MongoDB database
 */
export const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || "";
    await mongoose.connect(`${dbUri}/taskmanagement`);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: ", error);
    process.exit(1);
  }
};
