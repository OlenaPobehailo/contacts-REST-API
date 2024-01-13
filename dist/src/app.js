"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const contacts_1 = __importDefault(require("./routes/api/contacts"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/api/contacts", contacts_1.default);
app.use("/api/users", auth_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});
exports.default = app;
