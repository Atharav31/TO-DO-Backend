import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

let tasks = [];
let currentId = 0;

app.use(express.json());

// middlewares

//authentication
const authenticate = (req, res, next) => {
  //console.log(req.headers);
  const { authorization } = req.headers;
  const key = process.env.API_KEY || "1234";
  if (authorization === `Bearer ${key}`) {
    req.user = { role: "admin" };
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
const authorization = (req, res, next) => {
  console.log(req.user);
  const { role } = req.user;
  if (role == "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
//check for error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

//check for title and description
const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  next();
};

//create task
app.post("/tasks", authenticate, validateTask, (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  const newtask = {
    id: currentId++,
    title,
    description,
  };
  tasks.push(newtask);
  res.status(201).json({ newtask, message: "Task created successfully" });
});

//get all tasks
app.get("/tasks", authenticate, (req, res) => {
  res.status(200).json(tasks);
});

//get task by Id
app.get("/tasks/:id", authenticate, (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    res.status(200).json({ task, message: "Task found successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

//update task
app.put("/tasks/:id", authenticate, authorization, validateTask, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    task.title = title;
    task.description = description;
    res.status(200).json({ task, message: "Task updated successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

//delete task
app.delete("/tasks/:id", authenticate, authorization, (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    tasks = tasks.filter((task) => task.id != id);
    res.status(200).json({ tasks, message: "Task deleted successfully" });
  } else {
    res.status(404).json({ tasks, message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
