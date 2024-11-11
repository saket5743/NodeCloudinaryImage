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
const Store_1 = __importDefault(require("../models/Store"));
const upload_1 = __importDefault(require("../helpers/upload"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const upload = yield (0, upload_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        var store = new Store_1.default({
            file_url: upload === null || upload === void 0 ? void 0 : upload.secure_url
        });
        var record = yield store.save();
        res.send({ succes: true, msg: 'File Uploaded Successfully!', data: record });
    }
    catch (error) {
        res.send({ succes: false, msg: error.message });
    }
});
exports.default = uploadFile;
