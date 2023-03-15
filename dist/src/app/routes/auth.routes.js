"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dto_middleware_1 = __importDefault(require("../middlewares/dto.middleware"));
const auth_dto_1 = require("../dtos/auth.dto");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const authRouter = express_1.default.Router();
authRouter.post("/sign-in", (0, dto_middleware_1.default)(auth_dto_1.LoginDTO), (0, asyncHandler_1.default)(auth_controller_1.default.signIn));
authRouter.post("/register", (0, dto_middleware_1.default)(auth_dto_1.SignupDTO), (0, asyncHandler_1.default)(auth_controller_1.default.signUp));
authRouter.delete("/logout", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, asyncHandler_1.default)(auth_controller_1.default.logout));
exports.default = authRouter;
