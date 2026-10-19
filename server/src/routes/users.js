import express from "express";
import { createUser, getAllUsers } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/allusers", getAllUsers);
userRouter.post("/signup", createUser);

export default userRouter;
