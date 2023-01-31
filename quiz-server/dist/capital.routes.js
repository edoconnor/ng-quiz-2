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
exports.capitalRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("mongodb"));
const database_1 = require("./database");
exports.capitalRouter = express_1.default.Router();
exports.capitalRouter.use(express_1.default.json());
exports.capitalRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const capitals = yield database_1.collections.capitals.find({}).toArray();
        res.status(200).send(capitals);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.capitalRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb_1.default.ObjectId(id) };
        const capital = yield database_1.collections.capitals.findOne(query);
        if (capital) {
            res.status(200).send(capital);
        }
        else {
            res.status(404).send(`Failed to find a capital: ID ${id}`);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to find a capital: ID ${(_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id}`);
    }
}));
