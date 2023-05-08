const sequelize = require("../config/index");
const { Task, User, Project } = require("../models");
const taskSeeds = require('./task')
const userSeeds = require('./user')
const projectSeeds = require('./project')


const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });
    const projectData = await Project.bulkCreate(projectSeeds);
    const userData = await User.bulkCreate(userSeeds);
    const taskData = await Task.bulkCreate(taskSeeds);
    // console.log("userData:", userData)
    console.log('===\n\n\ntest\n\n\n===')
    await userData[0].addProjects(1)

    // for (let i = 0; i < userData.length; i++) {
    //   userData[i].addProject(1)
      
    // }
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
