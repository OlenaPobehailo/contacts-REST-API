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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const user_1 = require("../models/user");
const auth_1 = require("./auth");
const { DB_HOST } = process.env;
if (!DB_HOST) {
    throw new Error("DB_HOST environment variable is not set.");
}
const testLoginData = {
    email: "test1@gmail.com",
    password: "test1",
};
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(userData.password, 10);
    yield user_1.User.create(Object.assign(Object.assign({}, userData), { password: hashPassword }));
});
describe("Test Login Controller", () => {
    let server = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = app_1.default.listen(3001);
        yield mongoose_1.default.connect(DB_HOST);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield mongoose_1.default.connection.close();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    test("The response should have status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser(testLoginData);
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/users/login").send(testLoginData);
        expect(res.statusCode).toBe(200);
    }));
    test("The response should return a token and a user object with 2 fields email and subscription, having the data type String", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser(testLoginData);
        const req = { body: testLoginData };
        const res = { json: jest.fn() };
        yield (0, auth_1.loginController)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            token: expect.any(String),
            user: expect.objectContaining({
                email: testLoginData.email,
                subscription: expect.stringContaining("starter" || "pro" || "business"),
            }),
        });
    }));
});
