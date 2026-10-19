import bcrypt from "bcrypt";
import User from "../models/user.js";

const getAllUsers = async (req, res) => {
	const users = await User.find({}).populate("links");
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

export { createUser, getAllUsers };
