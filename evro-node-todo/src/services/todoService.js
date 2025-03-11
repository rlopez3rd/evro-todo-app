const { Todo } = require("../models");
const { infinitePaginate } = require("../utils/paginate");

class TodoService {
  static async getTodo(id) {
    const data = await Todo.findByPk(id);

    return data;
  }

  static async getTodoListScroll(request) {
    try {
      const { page, limit } = request;

      const query = {
        attributes: ["id", "text", "isComplete", "type", "updatedAt"],
        where: {
          ...(request.type && { type: request.type }),
        },
        order: [["updatedAt", "DESC"]],
      };

      const result = await infinitePaginate(Todo, query, page, limit);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async getTodo(id) {
    try {
      const data = await Todo.findByPk(id);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async createTodo(payload) {
    try {
      const data = await Todo.create({
        text: payload.text,
        type: payload.type,
        isComplete: false,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async updatedTodoById(payload, id) {
    try {
      const data = await Todo.findByPk(id);

      data.text = payload.text ?? data.text;
      data.isComplete = payload.isComplete ?? data.isComplete;

      await data.save();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteTodoById(id) {
    try {
      const data = await Todo.findByPk(id);

      if (data) {
        await data.destroy();
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async clearCompletedTodo(todoIds) {
    try {
      const result = await Todo.destroy({
        where: {
          id: todoIds,
        },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TodoService;
