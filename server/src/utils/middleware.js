import jwt from "jsonwebtoken";
import Link from "../models/link.js";
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

	next();
};

const getToken = (req, res, next) => {
	const authHeader = req.get("authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "token missing" });
	}
	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Token not valid", err });

		req.user = user;
		next();
	});
};

const verifyLink = async (req, res, next) => {
	const link = await Link.findOne({ _id: req.params.id, user: req.user.id });

	if (!link) {
		return res.status(404).json({ error: "Link not found" });
	}

	req.link = link;

	next();
};

export { errorHandler, getToken, unknownEndpoint, verifyLink };
