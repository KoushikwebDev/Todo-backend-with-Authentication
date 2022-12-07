const swaggerAutogen = require("swagger-autogen")();
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "My Todo app API",
    description: "Description",
  },
  host: `${HOST}`,
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/userRouter.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
