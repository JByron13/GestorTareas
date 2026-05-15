const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ESTA LÍNEA ES CLAVE
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});