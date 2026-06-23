const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// 🔵 GET - obtener tareas
router.get("/", auth, async(req,res)=>{
  try {
    const todos = await Todo.find({
 user:req.user
});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST - crear tarea
router.post("/", async (req, res) => {
  try {
   const newTodo = new Todo({

text:req.body.text,

user:req.user

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