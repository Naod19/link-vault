import * as logger from "./logger.js";

const unknownEndpoint = (req, res) => {
	res.status(400).json({ error: "Unknown Enpoint" });
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).json({ error: "malformed id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}
};

export { errorHandler, unknownEndpoint };
