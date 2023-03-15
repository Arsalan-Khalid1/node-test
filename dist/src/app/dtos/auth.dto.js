"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = exports.SignupDTO = void 0;
const class_validator_1 = require("class-validator");
const match_1 = require("../decorators/match");
class SignupDTO {
    constructor(email, password, passwordConfirmation, name) {
        this.name = "";
        this.email = email;
        this.password = password;
        this.name = name;
        this.passwordConfirmation = passwordConfirmation;
    }
}
__decorate([
    (0, class_validator_1.IsEmail)()
], SignupDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password too weak",
    })
], SignupDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    (0, match_1.Match)("password")
], SignupDTO.prototype, "passwordConfirmation", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 255)
], SignupDTO.prototype, "name", void 0);
exports.SignupDTO = SignupDTO;
class LoginDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
