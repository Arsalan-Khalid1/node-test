import express from "express";
import dtoValidationMiddleware from "../middlewares/dto.middleware";
import { LoginDTO, SignupDTO } from "../dtos/auth.dto";
import asyncHandler from "../utils/asyncHandler";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-in", dtoValidationMiddleware(LoginDTO), asyncHandler(AuthController.signIn));
authRouter.post("/register", dtoValidationMiddleware(SignupDTO), asyncHandler(AuthController.signUp));
authRouter.delete("/logout", asyncHandler(AuthController.logout));

export default authRouter;