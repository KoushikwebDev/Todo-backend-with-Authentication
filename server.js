import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

import app from "./app.js";

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
