const router = require("express").Router();
const { Task, User } = require("../../models");

// CREATE new task
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      // include:[User]
    });
    if (tasks.length === 0) {
      return res.status(404).json({ msg: "no tasks in database!" });
    }
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.get("/:name", (req, res) => {
  Task.findAll({
    where: {
      name: req.params.name,
    },
  })
    .then((tasks) => {
      if (tasks.length === 0) {
        return res
          .status(404)
          .json({ msg: "no tasks with this name in database!" });
      }
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

router.get("/:id", (req, res) => {
  Task.findByPk(req.params.id)
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ msg: "no task with that id in database!" });
      }
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

router.put("/:id", (req, res) => {
  Task.update(
    {
      name: req.body.name,
      due_date: req.body.due_date,
      description: req.body.description,
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editTask) => {
      if (!editTask[0]) {
        return res
          .status(404)
          .json({ msg: "no task with this id in database!" });
      }
      res.json(editTask);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

router.delete("/:id", (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delTask) => {
      if (!delTask) {
        return res
          .status(404)
          .json({ msg: "no task with this id in database!" });
      }
      res.json(delTask);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

module.exports = router;
