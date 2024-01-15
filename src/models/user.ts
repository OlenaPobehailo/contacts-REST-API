import { Schema, model, Types } from "mongoose";
import IUser from "../interfaces/IUser";
const { handleMongooseError } = require("../helpers");

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
