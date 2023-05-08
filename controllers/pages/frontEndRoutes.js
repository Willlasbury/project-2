const router = require('express').Router()

// send homepage as initial action
router.get("/", async (req, res) => {
    try {
      res.render("homepage", {
        logged_in: req.session.logged_in
  
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });

// control what happens when user clicks on login 
router.get("/login",(req,res)=>{
    // prevent user from accessing login page if they are already logged in
    if(req.session.logged_in){
        return res.redirect("/")
    }
    // direct to login page and send session logged in status
    res.render("login",{
        logged_in:req.session.logged_in
    })
  })
  router.get("/sign_up", async (req, res) => {
    try {
      res.render("sign_up", {
        sign_up: req.session.sign_up
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });
  router.get("/create_projects", async (req, res) => {
    try {
      res.render("create_projects", {
        create_projects: req.session.create_projects
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });
  router.get("/create_tasks", async (req, res) => {
    try {
      res.render("create_tasks", {
        create_tasks: req.session.create_tasks
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });
  router.get("/individual_project", async (req, res) => {
    try {
      res.render("individual_project", {
        individual_project: req.session.individual_project
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });
  router.get("/project_overview", async (req, res) => {
    try {
      res.render("project_overview", {
        project_overview: req.session.project_overview
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
  });

  module.exports = router
