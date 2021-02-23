"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointments_router_1 = __importDefault(require("../../../../modules/appointments/infra/http/routes/appointments.router"));
var users_router_1 = __importDefault(require("../../../../modules/users/infra/http/routes/users.router"));
var sessions_router_1 = __importDefault(require("../../../../modules/users/infra/http/routes/sessions.router"));
var routes = express_1.Router();
routes.use("/appointments", appointments_router_1.default);
routes.use("/users", users_router_1.default);
routes.use("/sessions", sessions_router_1.default);
exports.default = routes;
