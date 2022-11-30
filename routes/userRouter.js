import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  home,
  register,
  login,
  dashboard,
} from "../controllers/userController.js";

import {
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
  addTasks,
  editTitle,
  searchData,
} from "../controllers/todoController.js";

router.get("/", home);
router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", dashboard);

// todo routes
router.get("/getTodo/:email", getTodo);
router.post("/addTodo/:email", addTodo);
router.delete("/deleteTodo/:email/:uuid", deleteTodo);
router.put("/editTodo/:email/:index", editTodo);
router.put("/addtasks/:email/:index", addTasks);
router.put("/editTitle/:email/:index", editTitle);
router.get("/search/:email", searchData);
export default router;
