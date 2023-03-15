"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_service_1 = require("../services/error.service");
const errorFormattingService = new error_service_1.ErrorFormattingService();
const errorMiddleware = (error, req, res, next) => {
    var _a, _b;
    const formattedError = errorFormattingService.formatError(error);
    console.error(error);
    return res.status(formattedError.statusCode).json({ errors: (_a = formattedError.errors) !== null && _a !== void 0 ? _a : formattedError.message, success: false, type: (_b = formattedError.type) !== null && _b !== void 0 ? _b : "basic" });
};
exports.errorMiddleware = errorMiddleware;
