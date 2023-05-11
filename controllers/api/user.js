const router = require("express").Router();
const { User, Project } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const data = await User.findAll({ include: [Project] });
    if (data.length === 0) {
      return res.status(404).json({ msg: "no Users in database!" });
    }
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error occurred", err: err });
  }
});

// create a new user when signing up
router.post("/", async (req, res) => {
  try {
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    const dbResponse = await User.create(newUser);
    
    if (req.body.projectId) {
      await dbResponse.addProject(req.body.projectId);
    }
    req.session.user_id = dbResponse.dataValues.id;
    req.session.logged_in = true;

    return res.status(200).json(dbResponse);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error occurred", err: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }
    
    const passwordCheck = await userData.checkPassword(req.body.password);

    if (!passwordCheck) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    req.session.logged_in = true;
    req.session.user_id = userData.id;
    return res.render('homepage')
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
