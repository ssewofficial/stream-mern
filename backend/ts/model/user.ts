import mongoose from "mongoose";
import { generateRandomNumber } from "../lib/id.js";
import validator from "../lib/validator.js";

const nameSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [
        {
          validator: validator.isAlphanumeric,
          message: (props) =>
            `${props.value} can only contain letters and numbers!`,
        },
        {
          validator: (value) => value.length >= 3 && value.length <= 20,
          message: (props) => `Username must be between 3 and 20 characters!`,
        },
        {
          validator: (value) => {
            return value !== "admin";
          },
          message: (props) => `Username cannot be 'admin'!`,
        },
      ],
    },
    name: {
      type: nameSchema,
      required: true,
      trim: true,
    },
    personalId: {
      type: Number,
      unique: true,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.personalId) {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = generateRandomNumber(10);
      const existingUser = await User.findOne({ personalId: uniqueId });
      if (!existingUser) isUnique = true;
    }

    this.personalId = uniqueId;
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
