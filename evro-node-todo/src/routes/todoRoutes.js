const express = require("express");
const {
  getTodo,
  createTodo,
  updateTodoById,
  deleteTodoById,
  clearCompletedTodo,
  getTodoListScroll,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodoListScroll);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.put("/:id", updateTodoById);

router.delete("/:id", deleteTodoById);

router.post("/clear-completed", clearCompletedTodo);

module.exports = router;
