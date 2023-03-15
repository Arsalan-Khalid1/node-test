"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    if (!req.cookies.token) {
        throw new Error("401");
    }
    const decoded = (0, jsonwebtoken_1.verify)(req.cookies.token, config_1.default.SECRET_KEY);
    if (decoded) {
        req.user = decoded;
        console.log(decoded);
        next();
    }
    else {
        throw new Error("401");
    }
};
exports.default = isAuthenticated;
