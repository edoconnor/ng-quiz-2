"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const capital_routes_1 = require("./capital.routes");
dotenv_1.default.config();
const { ATLAS_URI } = process.env;
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
const PORT = process.env.PORT || 5200;
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use("/quiz", capital_routes_1.capitalRouter);
    app.listen(process.env.PORT || 5200, () => {
        console.log("Server is on " + PORT);
    });
})
    .catch((error) => console.error(error));
