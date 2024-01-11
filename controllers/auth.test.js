const {
  describe,
  beforeAll,
  afterAll,
  afterEach,
  test,
  expect,
} = require("@jest/globals");

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

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);
  await User.create({ ...userData, password: hashPassword });
};

describe("Test Login Controller", () => {
  let server = null;

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

    const req = { body: testLoginData };
    const res = { json: jest.fn() };

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.objectContaining({
        email: testLoginData.email,
        subscription: expect.stringContaining("starter", "pro", "business"),
      }),
    });
  });
});
