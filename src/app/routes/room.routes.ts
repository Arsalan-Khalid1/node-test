import express, { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import isAuthenticated from "../middlewares/auth.middleware";
const rooms: any[] = ["Task 1", "Task 2"]

const roomRouter = express.Router();
roomRouter.get("/", asyncHandler(isAuthenticated), (req: Request, res: Response) => {
    return res.status(200).json({
        success: "true",
        rooms
    })
});

export default roomRouter;