import User from "../model/userSchema.js";
import { v4 as uuidv4 } from "uuid";

const getTodo = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log(email);
    if (!email) {
      throw new Error("Email is required.");
    }
    let todo = await User.findOne({ email });

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, tasks } = req.body;
    let email = req.params.email;
    let response = await User.findOne({ email });

    let newTasks = tasks.split(",");

    let newTodo = {
      uuid: uuidv4(),
      title,
      tasks: newTasks,
    };
    console.log(newTodo);
    response.todos.push(newTodo);
    let response2 = await User.findByIdAndUpdate(response._id, response);
    await response2.save();
    // console.log(response2);
    res.json({ response2 });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let email = req.params.email;
    let uuid = req.params.uuid;
    let response = await User.findOne({ email });
    console.log(response.todos);
    console.log(uuid);

    let newArr = response.todos.filter((item) => {
      return item.uuid !== uuid;
    });
    // console.log(newArr);

    response.todos = [...newArr];
    let response2 = await User.findByIdAndUpdate(response._id, response);
    await response2.save();

    // console.log(response2);
    res.status(200).json({ success: true, response2 });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const editTodo = async (req, res) => {
  try {
    const { title, tasks } = req.body;

    let email = req.params.email;
    let index = req.params.index;
    let newTasks = tasks.split(",");
    let response = await User.findOne({ email });
    // console.log(response);

    //  let newArr = response.todos.filter((item) => {
    //   return item.uuid !== uuid;
    // });

    response.todos[index].title = title;
    response.todos[index].tasks = newTasks;
    let response2 = await User.findByIdAndUpdate(response._id, response);
    await response2.save();

    // console.log(response2);
    res.status(200).json({ success: true, response2 });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const addTasks = async (req, res) => {
  try {
    const { tasks } = req.body;
    let email = req.params.email;
    let index = req.params.index;
    let newTasks = tasks.split(",");

    let response = await User.findOne({ email });
    response.todos[index].tasks.push(...newTasks);
    let response2 = await User.findByIdAndUpdate(response._id, response);
    await response2.save();
    // console.log(response2);
    res.status(200).json({ success: true, response2 });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const editTitle = async (req, res) => {
  try {
    const { title } = req.body;
    let email = req.params.email;
    let index = req.params.index;

    let response = await User.findOne({ email });
    response.todos[index].title = title;

    let response2 = await User.findByIdAndUpdate(response._id, response);
    await response2.save();
    // console.log(response2);
    res.status(200).json({ success: true, response2 });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// search data
const searchData = async (req, res) => {
  try {
    const email = req.params.email;

    const response = await User.findOne({ email });
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    res.status(200).json({ message: error.messsage });
  }
};

export {
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
  addTasks,
  editTitle,
  searchData,
};
