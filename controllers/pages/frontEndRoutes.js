const router = require("express").Router();
const { Project, User, Task } = require("../../models");
const dayJs = require("dayjs");

var logged;
// send homepage as initial action
router.get("/", async (req, res) => {
  try {
    // check if user has an id in session
    if (req.session.user_id) {
      const dbResponse = await Project.findAll({
        include: [
          { model: Task },
          { model: User, where: { id: req.session.user_id } },
        ],
      });
      const filterData = await dbResponse.map((project) =>
        project.get({ plain: true })
      );

      for (let i = 0; i < filterData.length; i++) {
        const project = filterData[i];
        const tasks = filterData[i].Tasks;

        // add due date params
        const currentTime = dayJs();
        const newDate = currentTime.diff(project.due_date) * -1;
        project.due_date = dayJs(project.due_date).format("MMMM DD, YYYY");
        project.time_until_due = newDate;

        // add project status param from average of tasks status
        let netStatus = 0;
        let numTasks = 0;
        for (let j = 0; j < tasks.length; j++) {
          const task = tasks[j];
          netStatus = netStatus + Number(task.status);
          numTasks++;
        }

        // update codes for backgrounds
        const status = Math.floor(netStatus / numTasks);

        console.log("project.time_until_due:", project.time_until_due);

        if (status === 1) {
          project.status = "red";
          project.icon = "😱";
        } else if (status === 2) {
          project.status = "yellow";
          project.icon = "😬";
        } else if (status === 3) {
          project.status = "green";
          project.icon = "👍";
        } else if (status === 4) {
          project.status = "blue";
          project.icon = "🆕";
        }

        if (project.time_until_due < 1000 * 60 * 60 * 24) {
          project.status = project.status + "-600";
        } else if (project.time_until_due < 1000 * 60 * 60 * 24 * 7) {
          project.status = project.status + "-500";
        } else {
          project.status = project.status + "-400";
        }
      }

      res.render("homepage", {
        yourProjects: filterData,
        logged_in: req.session.logged_in,
      });
    } else {
      someObj = {};
      res.render("login");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

// control what happens when user clicks on login
router.get("/login", (req, res) => {
  // prevent user from accessing login page if they are already logged in
  if (req.session.logged_in) {
    return res.redirect("/");
  }
  // direct to login page and send session logged in status
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/sign_up", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/create_projects", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("create_projects", {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/create_tasks/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const dbResponse = await Project.findOne({
        where: { id: req.params.id },
      });
      const formatData = await dbResponse.get({ plain: true });
      console.log("formatData:", formatData);

      res.render("create_tasks", {
        logged_in: req.session.logged_in,
        project: formatData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/project/:id", (req, res) => {
  if (req.session.logged_in) {
    Project.findByPk(req.params.id, {
      include: [Task],
    }).then((projData) => {
      const hbsData = projData.get({ plain: true });
      hbsData.due_date = dayJs(hbsData.due_date).format("MMMM DD, YYYY");
      // hbsData.logged_id = req.session.logged_id;
      const currentTime = dayJs();
      const newDate = currentTime.diff(hbsData.due_date, "days") * -1;
      hbsData.time_until_due = newDate;
      const dataobj = hbsData.Tasks;
      for (let i = 0; i < dataobj.length; i++) {
        dataobj[i].due_date = dayJs(dataobj[i].due_date).format("MMMM DD, YYYY");
        const formattedData = dataobj[i].status;
        if (formattedData === 1) {
          dataobj[i].status = "red-500";
          console.log("test:");
        } else if (formattedData === 2) {
          dataobj[i].status = "yellow-400";
        } else if (formattedData === 3) {
          dataobj[i].status = "green-400";
        } else if (formattedData === 4) {
          dataobj[i].status = "sky-400";
        }
      }
      res.render("individual_project", {
        project: hbsData,
        logged_in: req.session.logged_in,
      });
    });
  }
});

router.get("/project_overview", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("project_overview", { logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/task/:id", (req, res) => {
  Task.findByPk(req.params.id, {
    include: [Project],
  }).then((dbResponse) => {
    const taskData = dbResponse.get({ plain: true });
    console.log("taskData:", taskData);
    console.log("due_date", taskData.due_date);
    taskData.due_date = dayJs(taskData.due_date).format("MM/DD/YYYY");

    res.render("edit_task", taskData);
  });
});

router.get("/projects/edit/:id", (req, res) => {
  Project.findByPk(req.params.id, {}).then((dbResponse) => {
    const projData = dbResponse.get({ plain: true });
    console.log("projData:", projData);
    console.log("due_date", projData.due_date);
    projData.due_date = dayJs(projData.due_date).format("MM/DD/YYYY");

    res.render("edit_projects", projData);
  });
});

module.exports = router;
