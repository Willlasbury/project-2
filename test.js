const dayJs = require("dayjs");

const projectDue = dayJs("05/10/2023");
const currentTime = dayJs().format("MM/DD/YYYY");
console.log(currentTime);

// TODO: find differnce between due date and current date
const newDate = projectDue.diff(currentTime, "day");
console.log(newDate);

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }

// TODO: for loop through array of projects
// TODO: get project due date

// TODO: add property to project with time left
