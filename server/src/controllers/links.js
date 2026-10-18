import Link from "../models/link.js";

const getAllLinks = async (req, res) => {
	const links = await Link.find({});
	res.json(links);
};

const getLinkById = async (req, res) => {
	const id = req.params.id;

	const link = await Link.findById(id);
	res.json(link);
};

const createLink = async (req, res) => {
	const { title, url, category } = req.body;

	const newLink = new Link({
		title,
		url,
		category,
	});

	const savedLink = await newLink.save();
	res.status(201).json(savedLink);
};

const updateLink = async (req, res) => {
	const id = req.params.id;
	const { title, url, category } = req.body;

	const linkToUpdate = await Link.findById(id);

	if (!linkToUpdate) {
		return res.status(404).json({ error: "link not found" });
	}

	if (title !== undefined) linkToUpdate.title = title;
	if (url !== undefined) linkToUpdate.url = url;
	if (category !== undefined) linkToUpdate.category = category;

	const updatedLink = await linkToUpdate.save();
	res.status(200).json(updatedLink);
};

const deleteLink = async (req, res) => {
	const id = req.params.id;
	const result = await Link.findByIdAndDelete(id);
	if (result === null) {
		res.status(404).json({ error: "link not found" });
	}
	res.status(204).end();
};

export { createLink, deleteLink, getAllLinks, getLinkById, updateLink };
