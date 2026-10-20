import * as logger from "./logger.js";

const unknownEndpoint = (req, res) => {
	res.status(400).json({ error: "Unknown Enpoint" });
};

const errorHandler = (error, req, res, next) => {
	logger.error(`${error.name}:`, error.message);

	if (error.name === "CastError") {
		return res.status(400).json({ error: "malformed id" });
	}

	if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	if (
		error.name === "MongoServerError" &&
		error.message.includes("E11000 duplicate key error collection")
	) {
		return res.status(400).json({ error: "username is already taken" });
	}

	if (error.message.includes("data and hash arguments required")) {
		return res.status(400).json({ error: "password must be provided" });
	}
};

export { errorHandler, unknownEndpoint };
