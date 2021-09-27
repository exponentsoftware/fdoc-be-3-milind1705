const Todo = require("../models/todo");
const User = require("../models/user");

module.exports.createTodo = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then((data) => {
      return res.status(200).json({
        error: null,
        data: data,
        message: "successfully fetch the data",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
        data: null,
        message: "Something went wrong",
      });
    });

  user.todo.push(newTodo.id);
  await user
    .save()
    .then((data) => {
      return console.log(data);
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
        data: null,
        message: "Something went wrong",
      });
    });
};

module.exports.getAll_todo = (req, res) => {
  Todo.find({})
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.get_todo_byId = (req, res) => {
  Todo.findById({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.update_todo = (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Todo.findById({ _id: req.params.id })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message || "Something went wrong",
        });
      });
  });
};

module.exports.delete_todo_byId = (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json("Successfully deleted");
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAll_todo_bytitle = (req, res) => {
  const title = req.query.title;
  Todo.find({ title: title })
    .then((data) => {
      if ((data.title = title)) {
        return res.status(200).json(data);
      } else {
        return res.status(204).json({
          message: "No data with this title",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAll_todo_byCategory = (req, res) => {
  const category = req.query.category;
  Todo.find({ category: category })
    .then((data) => {
      if ((data.category = category)) {
        return res.status(200).json(data);
      } else {
        return res.status(204).json({
          message: "No data with this category",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAll_todo_sort = (req, res) => {
  Todo.find({})
    .sort("created_at")
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.done_todo = (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Todo.findById({ _id: req.params.id })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message || "Something went wrong",
        });
      });
  });
};
