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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthService {
    signup(signupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.create({
                name: signupDto.name,
                email: signupDto.email,
                password: yield bcrypt_1.default.hash(signupDto.password, 10)
            });
            if (user) {
                return user;
            }
        });
    }
    generateToken(user) {
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, config_1.default.SECRET_KEY, { expiresIn: '100m' });
        return token;
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginDto;
            const user = yield user_model_1.default.findOne({
                email,
            });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            user.status = 'online';
            yield user.save();
            return { accessToken: this.generateToken({ id: user._id }), user: {
                    id: user.id, name: user.name, email: user.email, status: user.status
                } };
        });
    }
}
exports.AuthService = AuthService;
