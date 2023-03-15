"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./src/config/db");
const auth_routes_1 = __importDefault(require("./src/app/routes/auth.routes"));
const error_middleware_1 = require("./src/app/middlewares/error.middleware");
const book_routes_1 = __importDefault(require("./src/app/routes/book.routes"));
const node_cache_1 = __importDefault(require("node-cache"));
const http_1 = require("http");
const socket_service_1 = require("./src/app/services/socket.service");
const app = (0, express_1.default)();
const socketService = new socket_service_1.SocketService();
exports.myCache = new node_cache_1.default({ stdTTL: 100, checkperiod: 120 });
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_routes_1.default);
app.use("/api/v1/books", book_routes_1.default);
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use(error_middleware_1.errorMiddleware);
const server = (0, http_1.createServer)(app);
(0, db_1.connectToDb)();
socketService.socketHandler(server);
server.listen(5001, () => {
    console.log("server started at port 5000 ");
});
