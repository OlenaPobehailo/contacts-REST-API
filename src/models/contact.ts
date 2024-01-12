import { Schema, model, Types } from "mongoose";
const { handleMongooseError } = require("../helpers");

interface IContact {
  name: string;
  email?: string;
  phone?: string;
  favorite: boolean;
  owner: Types.ObjectId;
}

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
