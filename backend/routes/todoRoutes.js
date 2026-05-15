const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// 🔵 GET - obtener tareas
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST - crear tarea
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text
    });

    const saved = await newTodo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 DELETE - eliminar tarea
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;