import express from "express";
import {
	createLink,
	deleteLink,
	getAllLinks,
	getLinkById,
	updateLink,
} from "../controllers/links.js";

const linkRouter = express.Router();

linkRouter.get("/", getAllLinks);
linkRouter.get("/:id", getLinkById);
linkRouter.post("/", createLink);
linkRouter.put("/:id", updateLink);
linkRouter.delete("/:id", deleteLink);

export default linkRouter;
