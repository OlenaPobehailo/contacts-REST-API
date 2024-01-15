import bcrypt from "bcrypt";
import mongoose from "mongoose";
import request from "supertest";

import app from "../app";

import { loginController } from "./auth";
import { User } from "../models/user";
import TestLoginData from "../interfaces/ITestLoginData";

const { DB_HOST } = process.env;

if (!DB_HOST) {
  throw new Error("DB_HOST environment variable is not set.");
}

const testLoginData: TestLoginData = {
  email: "test1@gmail.com",
  password: "test1",
};

const createUser = async (userData: TestLoginData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);
  await User.create({ ...userData, password: hashPassword });
};

describe("Test Login Controller", () => {
  let server: any = null;

  beforeAll(async () => {
    server = app.listen(3001);
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("The response should have status code 200", async () => {
    await createUser(testLoginData);

    const res = await request(app).post("/api/users/login").send(testLoginData);

    expect(res.statusCode).toBe(200);
  });

  test("The response should return a token and a user object with 2 fields email and subscription, having the data type String", async () => {
    await createUser(testLoginData);

    const req: any = { body: testLoginData };
    const res: any = { json: jest.fn() };
    const next = jest.fn();

    await loginController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.objectContaining({
        email: testLoginData.email,
        subscription: expect.stringContaining("starter" || "pro" || "business"),
      }),
    });
  });
});
