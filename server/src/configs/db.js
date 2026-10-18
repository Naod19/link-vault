import mongoose from "mongoose";
import * as logger from "../utils/logger.js";

const connectDB = async () => {
	const uri = process.env.DATABASE_URI;

	logger.info("connecting to mongodb");

	if (!uri) {
		throw new Error("uri is not valid or not provided");
	}

	await mongoose.connect(uri, { family: 4 });

	logger.info("connected to mongodb");
};

export default connectDB;
