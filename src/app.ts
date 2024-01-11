import express, { Request, Response, NextFunction } from "express";

import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import contactsRouter from "./routes/api/contacts";
import authRouter from "./routes/api/auth";

const app = express();
const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
