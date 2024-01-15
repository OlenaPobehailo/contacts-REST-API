"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const auth_1 = require("./auth");
const user_1 = require("../models/user");
const { DB_HOST } = process.env;
if (!DB_HOST) {
    throw new Error("DB_HOST environment variable is not set.");
}
const testLoginData = {
    email: "test1@gmail.com",
    password: "test1",
};
const createUser = async (userData) => {
    const hashPassword = await bcrypt_1.default.hash(userData.password, 10);
    await user_1.User.create({ ...userData, password: hashPassword });
};
describe("Test Login Controller", () => {
    let server = null;
    beforeAll(async () => {
        server = app_1.default.listen(3001);
        await mongoose_1.default.connect(DB_HOST);
    });
    afterAll(async () => {
        server.close();
        await mongoose_1.default.connection.close();
    });
    afterEach(async () => {
        await user_1.User.deleteMany({});
    });
    test("The response should have status code 200", async () => {
        await createUser(testLoginData);
        const res = await (0, supertest_1.default)(app_1.default).post("/api/users/login").send(testLoginData);
        expect(res.statusCode).toBe(200);
    });
    test("The response should return a token and a user object with 2 fields email and subscription, having the data type String", async () => {
        await createUser(testLoginData);
        const req = { body: testLoginData };
        const res = { json: jest.fn() };
        const next = jest.fn();
        await (0, auth_1.loginController)(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            token: expect.any(String),
            user: expect.objectContaining({
                email: testLoginData.email,
                subscription: expect.stringContaining("starter" || "pro" || "business"),
            }),
        });
    });
});
