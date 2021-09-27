const express = require("express");
const router = express.Router();

const todo = require("../controller/todoController");
const checkAuth = require("../middleware/checkAuth");

router.post("/:id", todo.createTodo);
router.get("/", todo.getAll_todo);
router.get("/title", todo.getAll_todo_bytitle);
router.get("/category", todo.getAll_todo_byCategory);
router.get("/sort", todo.getAll_todo_sort);
router.put("/:id", todo.update_todo);
router.put("/done/:id", todo.update_todo);
router.get("/:id", todo.get_todo_byId);
router.delete("/:id", todo.delete_todo_byId);

module.exports = router;
