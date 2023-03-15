"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    newMessages: { type: Object, default: {} },
    status: { type: String, default: 'online' }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
