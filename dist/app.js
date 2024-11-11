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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("../src/db/connect"));
const app = (0, express_1.default)();
// var userRoute = require('./routes/userRoute');
// app.use('/api',userRoute);
var adminRoute = require('./routes/adminRoute');
app.use('/api', adminRoute);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
    console.log('DB Connected');
    app.listen(3000, function () {
        console.log('app is running');
    });
});
start();
