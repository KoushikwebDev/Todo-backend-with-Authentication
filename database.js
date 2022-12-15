import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { URI } = process.env;

const connectToDB = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useunifiedTopology: true,
    })
    .then((conn) => {
      console.log("Database Connection Success to " + conn.connection.host);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

export default connectToDB;
