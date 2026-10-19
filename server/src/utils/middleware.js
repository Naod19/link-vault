import * as logger from "./logger.js";

const unknownEndpoint = (req, res) => {
	res.status(400).json({ error: "Unknown Enpoint" });
};

const errorHandler = (error, req, res, next) => {
	logger.error(`${error.name}:`, error.message);

	if (error.name === "CastError") {
		return res.status(400).json({ error: "malformed id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	} else if (
		error.name === "MongoServerError" &&
		error.message.includes("E11000 duplicate key error collection")
	) {
		return res.status(400).json({ error: "username is already taken" });
	}
};

export { errorHandler, unknownEndpoint };
