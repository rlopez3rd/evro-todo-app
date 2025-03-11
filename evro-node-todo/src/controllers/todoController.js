const TodoService = require("../services/todoService");

class TodoController {
  static async getTodoList(req, res) {
    try {
      const data = await TodoService.getTodoList(req.query);
      res.json({ result: data });
    } catch (err) {
      console.log(err);
    }
  }

  static async getTodoListScroll(req, res) {
    try {
      const data = await TodoService.getTodoListScroll(req.query);
      res.json({ result: data });
    } catch (err) {
      console.log(err);
    }
  }

  static async getTodo(req, res) {
    try {
      const data = await TodoService.getTodo(req.params.id);
      res.status(200).json({ result: data });
    } catch (err) {
      console.log(err);
    }
  }

  static async createTodo(req, res) {
    try {
      const data = await TodoService.createTodo(req.body);
      res.status(200).json({ result: data });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateTodoById(req, res) {
    try {
      const { id } = req.params;
      const data = await TodoService.updatedTodoById(req.body, id);

      res.status(200).json({ result: data });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteTodoById(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await TodoService.deleteTodoById(id);

      if (isDeleted) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "Delete failed" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async clearCompletedTodo(req, res) {
    try {
      const { todo_ids } = req.body;

      const result = await TodoService.clearCompletedTodo(todo_ids);

      if (result) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(200).json({ message: "No deleted todos" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TodoController;
