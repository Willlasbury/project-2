const router = require("express").Router();
const { Project, User } = require("../../models");
const dayJs = require('dayjs')

// send homepage as initial action
const route1 = router.get("/", async (req, res) => {
  try {
    // check if user has an id in session
    if (req.session.user_id) {
      const userId = req.session.user_id;

      const dbResponse = await Project.findAll({
        include: [{ model: User, where: { id: req.session.user_id } }],
      });

      const filterData = await dbResponse.map((project) =>
        project.get({ plain: true }),
      );

      await filterData.map(project => {
        project.due_date = dayJs(project.due_date).format('DD MMMM YYYY')
        console.log("project:", project.due_date)
      })
      
      
      
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
const route2 = router.get("/login", (req, res) => {
  // prevent user from accessing login page if they are already logged in
  if (req.session.logged_in) {
    return res.redirect("/");
  }
  // direct to login page and send session logged in status
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/signup", async (req, res) => {
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

router.get("/individual_project", async (req, res) => {
  try {
    res.render("individual_project", dataObj);
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
