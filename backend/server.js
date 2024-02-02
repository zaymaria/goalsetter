const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const goalRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const Goal = require("./goal.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/goals", { useNewUrlParser: true});
const connection = mongoose.connection;

goalRoutes.route("/").get(async (req, res) => {
    try {
      const goals = await Goal.find();
      res.json(goals);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

goalRoutes.route("/:id").get(async (req, res) => {
    try {
      const id = req.params.id;
      const goal = await Goal.findById(id);
      res.json(goal);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  goalRoutes.route("/add").post(async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        res.status(201).json({ "goal": "goal added successfully" });
    } catch (err) {
        res.status(400).send("adding new goal failed");
    }
});

goalRoutes.route("/update/:id").post(async (req, res) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGoal)
            return res.status(404).send("data is not found");
        res.json("Goal updated");
    } catch (err) {
        res.status(404).send("Update was not possible");
    }
});

goalRoutes.route("/delete/:id").delete(async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal)
            return res.status(404).send("Goal not found");
        res.json("Goal deleted");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.use("/goals", goalRoutes);

app.use((err, req, res, next) => {
    res.status(500).send("Internal Server Error");
});

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

app.listen (PORT, () => {
    console.log("Server is running on Port: " + PORT);
});