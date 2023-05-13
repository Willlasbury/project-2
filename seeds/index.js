const sequelize = require("../config/index");
const { Task, User, Project } = require("../models");
const taskSeeds = require("./task");
const userSeeds = require("./user");
const projectSeeds = require("./project");

const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });
    const projectData = await Project.bulkCreate(projectSeeds);
    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });
    const taskData = await Task.bulkCreate(taskSeeds);

    for (let i = 0; i < userData.length; i++) {
      await userData[i].addProjects(i);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
