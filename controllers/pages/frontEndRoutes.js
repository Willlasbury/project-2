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
        include: [{ model: User, where: { id: 1 } }],
      });

      const filterData = await dbResponse.map((project) =>
        project.get({ plain: true })
      );
      // TODO: find current time
      var now = dayJs();c

      for (let i = 0; i < filterData.length; i++) {
        const project = filterData[i];
        const currentTime = dayJs();
        // TODO: find differnce between due date and current date
        const newDate = currentTime.diff(project.due_date);
        project.due_date = dayJs(project.due_date).format("DD MMMM YYYY");
        project.time_until_due = newDate;
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
      create_projects: req.session.create_projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/create_tasks", async (req, res) => {
  try {
    res.render("create_tasks");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/individual_projects/:id", async (req, res) => {
  try {
    const dbResponse = await Task.findAll({
      where: { ProjectId: req.params.id },
    });
    console.log("dbResponse:", dbResponse);
    console.log("===\n\n\ntest\n\n\n===");
    const project = dbResponse.map((task) => task.get({ plain: true }));
    // const project = await dbResponse.get({ plain: true })
    console.log("project:", project);

    res.render("individual_project", { project: project });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.get("/project_overview", async (req, res) => {
  try {
    res.render("project_overview");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

module.exports = router;
