import express from "express";
import {
	createLink,
	deleteLink,
	getAllLinks,
	getLinkById,
	updateLink,
} from "../controllers/links.js";
import { getToken, verifyLink } from "../utils/middleware.js";

const linkRouter = express.Router();
linkRouter.use(getToken);

linkRouter.get("/", getAllLinks);
linkRouter.get("/:id", verifyLink, getLinkById);
linkRouter.post("/", createLink);
linkRouter.put("/:id", verifyLink, updateLink);
linkRouter.delete("/:id", verifyLink, deleteLink);

export default linkRouter;
