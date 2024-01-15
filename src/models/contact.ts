import { Schema, model } from "mongoose";
import IContact from "../interfaces/IContact";
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

const Contact = model<IContact>("contact", contactSchema);

export { Contact };
