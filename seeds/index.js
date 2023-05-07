const sequelize = require("../config/index");
// const modelObj  = require("../models")
// const Zoo = modelObj.Zoo;
// const Animal = modelObj.Animal;
const { Task, User } = require("../models");

const tasks = [
  {
    name: "finish task routes",
    due_date: 05 / 10 / 2023,
    description: "finish the routes associated with the tasks model",
    status: "in-progress",
  },
  {
    name: "finish user routes",
    due_date: 05 / 11 / 2023,
    description: "finish the routes associated with the users model",
    status: "to-do",
  },
  {
    name: "finish project routes",
    due_date: 05 / 13 / 2023,
    description: "finish the routes associated with the projects model",
    status: "halted",
  },
];
// const users = [
//   {
//     name: "Turtly",
//     species: "turtle",
//     age: 100,
//     ZooId: 1,
//     notes: "slow",
//   },

// ];

const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });
    const taskData = await Task.bulkCreate(tasks);
    // const animalData = await Animal.bulkCreate(animals);
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
