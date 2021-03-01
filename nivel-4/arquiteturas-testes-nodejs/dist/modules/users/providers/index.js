"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var BCHashProvider_1 = __importDefault(require("./HashProvider/implementations/BCHashProvider"));
tsyringe_1.container.registerSingleton("IHashProvider", BCHashProvider_1.default);