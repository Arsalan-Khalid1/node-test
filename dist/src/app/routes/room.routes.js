"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const rooms = ["Task 1", "Task 2"];
const roomRouter = express_1.default.Router();
roomRouter.get("/", (0, asyncHandler_1.default)(auth_middleware_1.default), (req, res) => {
    return res.status(200).json({
        success: "true",
        rooms
    });
});
exports.default = roomRouter;
