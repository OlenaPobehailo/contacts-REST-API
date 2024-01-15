import { Schema, model, Types } from "mongoose";
const { handleMongooseError } = require("../helpers");

interface IUser {
  password: string;
  email: string;
  subscription: "starter" | "pro" | "business";
  token: string | null;
  avatarURL?: string;
  verify: boolean;
  verificationToken: string;
}

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      type: String,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const User = model<IUser>("user", userSchema);

export { User };
