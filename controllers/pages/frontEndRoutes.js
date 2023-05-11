const router = require("express").Router();
const { Project, User, Task } = require("../../models");
const dayJs = require("dayjs");
const projects = require("../../seeds/project");

// send homepage as initial action
router.get("/", async (req, res) => {
  try {
    // check if user has an id in session
    if (req.session.user_id) {
      const userId = req.session.user_id;

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
        project.due_date = dayJs(project.due_date).format("DD MMMM YYYY");
        project.time_until_due = newDate;

        // add project status param from average of tasks status
        let netStatus = 0;
        let numTasks = 0;
        for (let j = 0; j < tasks.length; j++) {
          const task = tasks[j];
          netStatus = netStatus + Number(task.status);
          numTasks++;
        }

        // TODO: update codes for backgrounds
        const status = Math.floor(netStatus / numTasks);
        console.log("status:", status);
        if (status === 1) {
          project.status = "red";
        } else if (status === 2) {
          project.status = "yellow";
        } else if (status === 3) {
          project.status = "green";
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
  try {
    res.render("create_projects", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/create_tasks/:id", async (req, res) => {
  try {
    const dbResponse = await Project.findOne({ where: { id: req.params.id } });
    const formatData = await dbResponse.get({ plain: true });
    console.log("formatData:", formatData);

    res.render("create_tasks", { project: formatData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

// router.get("/individual_projects/:id", async (req, res) => {
//   try {
//     const dbResponse = await Task.findByPk({
//       where: { ProjectId: req.params.id },
//     });
//     console.log("dbResponse:", dbResponse);
//     console.log("===\n\n\ntest\n\n\n===");
//     const project = dbResponse.map((task) => task.get({ plain: true }));
//     // const project = await dbResponse.get({ plain: true })
//     console.log("project:", project);

//     res.render("individual_project", { project: project });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ msg: "some error", err: err });
//   }
// });

router.get("/project/:id", (req, res) => {
  Project.findByPk(req.params.id, {
    include: [Task],
  }).then((projData) => {
    const hbsData = projData.get({ plain: true });
    hbsData.due_date = dayJs(hbsData.due_date).format("MMMM DD YYYY");
    hbsData.logged_id = req.session.logged_id;
    const currentTime = dayJs();
    const newDate = currentTime.diff(hbsData.due_date, "days");
    hbsData.time_until_due = newDate;
    console.log("=====\n\nTEST\n\n\n======");
    const dataobj = hbsData.Tasks;
    for (let i = 0; i < dataobj.length; i++) {
      const formattedData = dataobj[i].status;
      console.log("projData:", formattedData);
      if (formattedData === 1) {
        dataobj[i].status = "red";
        console.log("test:");
      } else if (formattedData === 2) {
        dataobj[i].status = "yellow";
      } else if (formattedData === 3) {
        dataobj[i].status = "green";
      }
    }

    console.log(hbsData);
    res.render("individual_project", hbsData);
  });
});

router.get("/project_overview", async (req, res) => {
  try {
    res.render("project_overview");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/task/:id", (req, res) => {
  Task.findByPk(req.params.id, {}).then((dbResponse) => {
    const taskData = dbResponse.get({ plain: true });
    console.log(taskData);
    res.render("edit_task", taskData);
  });
});

module.exports = router;
