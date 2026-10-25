import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};

const createUser = async (req, res) => {
	const { username, password } = req.body;

	const passwordHash = await bcrypt.hash(password, 10);

	const newUser = new User({
		username,
		password: passwordHash,
	});

	const savedUser = await newUser.save();
	res.status(201).json(savedUser);
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passwordCheck =
		user === null ? false : await bcrypt.compare(password, user.password);

	if (!(user && passwordCheck)) {
		return res.status(401).json({ error: "Invalid username or password" });
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.TOKEN_SECRET);

	res.json({ token, username: user.username });
};

export { createUser, getAllUsers, loginUser };
