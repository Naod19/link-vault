import Link from "../models/link.js";
import User from "../models/user.js";

const getAllLinks = async (req, res) => {
	const links = await Link.find({ user: req.user.id }).populate("user", {
		username: 1,
	});
	res.json(links);
};

const getLinkById = async (req, res) => {
	res.json(req.link);
};

const createLink = async (req, res) => {
	const { title, url, category } = req.body;
	const { id } = req.user;

	const user = await User.findById(id);

	if (!user) {
		return res.status(400).json({ error: "User is not valid or missing" });
	}

	const newLink = new Link({
		title,
		url,
		category,
		user: user._id,
	});

	const savedLink = await newLink.save();
	res.status(201).json(savedLink);
};

const updateLink = async (req, res) => {
	const { title, url, category } = req.body;

	const linkToUpdate = req.link;

	if (title !== undefined) linkToUpdate.title = title;
	if (url !== undefined) linkToUpdate.url = url;
	if (category !== undefined) linkToUpdate.category = category;

	const updatedLink = await linkToUpdate.save();
	res.status(200).json(updatedLink);
};

const deleteLink = async (req, res) => {
	await req.link.deleteOne();
	res.status(204).end();
};

export { createLink, deleteLink, getAllLinks, getLinkById, updateLink };
