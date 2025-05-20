import mongoose from "mongoose";
import { env } from "../constants/env.constant";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected");

    } catch (error) {

        console.log(error);
        process.exit(1);

    }
}

export default connectDB;
