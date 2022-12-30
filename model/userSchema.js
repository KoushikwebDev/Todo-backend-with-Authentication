import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    firstName: {
      type: String,
      trim: true,
      // required: true,
      // validator: (value) => {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Email is not Valid.");
      //   }
      // },
    },

    lastName: {
      type: String,
      // trim: true,
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      require: true,
      // validator: (value) => {
      //   if (!validator.isStrongPassword(value)) {
      //     throw new Error("Email is not Valid.");
      //   }
      // },
    },
    todos: [
      new Schema({
        uuid: String,
        title: String,
        tasks: [String],
      }),
    ],
    // createdAt: {
    //   type: Date,
    //   immutable: true,
    //   default: () => Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   immutable: true,
    //   default: () => Date.now(),
    // },
  },
  { timestamps: true }
);

const model = mongoose.model("User", userSchema);
export default model;
