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
exports.SocketService = void 0;
const message_model_1 = __importDefault(require("../models/message.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class SocketService {
    socketHandler(server) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = require("socket.io")(server, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"],
                },
            });
            io.on("connection", (socket) => {
                socket.on("new-user", () => __awaiter(this, void 0, void 0, function* () {
                    const members = yield user_model_1.default.find();
                    io.emit("new-user", members);
                }));
                socket.on("join-room", (newRoom, previousRoom) => __awaiter(this, void 0, void 0, function* () {
                    socket.join(newRoom);
                    socket.leave(previousRoom);
                    let roomMessages = yield this.getLastMessagesFromRoom(newRoom);
                    socket.emit("room-messages", roomMessages);
                }));
                socket.on("message-room", (room, content, sender, time, date) => __awaiter(this, void 0, void 0, function* () {
                    const newMessage = yield message_model_1.default.create({
                        content,
                        from: sender,
                        time,
                        date,
                        to: room,
                    });
                    let roomMessages = yield this.getLastMessagesFromRoom(room);
                    // sending message to room
                    io.to(room).emit("room-messages", roomMessages);
                    socket.broadcast.emit("notifications", room);
                }));
            });
        });
    }
    getLastMessagesFromRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            let roomMessages = yield message_model_1.default.aggregate([
                { $match: { to: room } },
                { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
            ]);
            return roomMessages;
        });
    }
}
exports.SocketService = SocketService;
