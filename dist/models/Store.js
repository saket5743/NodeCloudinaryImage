"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var storeSchema = new mongoose_1.default.Schema({
    file_url: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Store', storeSchema);
