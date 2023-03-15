"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_sanitizer_1 = require("class-sanitizer");
function dtoValidationMiddleware(type, skipMissingProperties = false) {
    return (req, res, next) => {
        const dtoObj = (0, class_transformer_1.plainToClass)(type, req.body);
        (0, class_validator_1.validate)(dtoObj, { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                let dtoErrors = [];
                errors.forEach((error) => Object.values(error.constraints).forEach((k) => {
                    dtoErrors.push({ message: k });
                }));
                throw new Error(JSON.stringify(dtoErrors));
            }
            else {
                //sanitize the object and call the next middleware
                (0, class_sanitizer_1.sanitize)(dtoObj);
                next();
            }
        })
            .catch((e) => res.status(400).json({ errors: JSON.parse(e.message), success: false }));
    };
}
exports.default = dtoValidationMiddleware;
