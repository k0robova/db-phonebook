import express from "express";
import { login, signup } from "../controllers/userControllers.js";
import { loginSchema, signupSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupSchema), signup);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout");
userRouter.get("/current");

export default userRouter;
