import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/eda-kafka-test");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
''