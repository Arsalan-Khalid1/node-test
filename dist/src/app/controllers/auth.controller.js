"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authData = req.body;
            const newUser = yield authService.signup(authData);
            return res.status(201).json({
                success: true,
                message: 'User has been created successfully',
                data: newUser,
            });
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authDto = req.body;
            const data = yield authService.login(authDto);
            return res.cookie("token", data.accessToken, { maxAge: 2 * 60 * 60 * 1000 }).status(200).json({
                success: true,
                message: 'User has been signed in successfully',
                data: data.user,
            });
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).clearCookie("token").json({
                success: true,
                message: 'User has been signed out successfully',
            });
        });
    }
}
exports.default = AuthController;
