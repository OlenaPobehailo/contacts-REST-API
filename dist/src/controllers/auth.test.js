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
const { describe, beforeAll, afterAll, afterEach, test, expect, } = require("@jest/globals");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models/user");
const { login } = require("./auth");
const { DB_HOST } = process.env;
const testLoginData = {
    email: "test1@gmail.com",
    password: "test1",
};
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt.hash(userData.password, 10);
    yield User.create(Object.assign(Object.assign({}, userData), { password: hashPassword }));
});
describe("Test Login Controller", () => {
    let server = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = app.listen(3001);
        yield mongoose.connect(DB_HOST);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield mongoose.connection.close();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User.deleteMany({});
    }));
    test("The response should have status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser(testLoginData);
        const res = yield request(app).post("/api/users/login").send(testLoginData);
        expect(res.statusCode).toBe(200);
    }));
    test("The response should return a token and a user object with 2 fields email and subscription, having the data type String", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser(testLoginData);
        const req = { body: testLoginData };
        const res = { json: jest.fn() };
        yield login(req, res);
        expect(res.json).toHaveBeenCalledWith({
            token: expect.any(String),
            user: expect.objectContaining({
                email: testLoginData.email,
                subscription: expect.stringContaining("starter", "pro", "business"),
            }),
        });
    }));
});
