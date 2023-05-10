// const dueDate = document.querySelector('#time-left').textContent

const colorTime = {
  due: 1000 * 60 * 60 * 24,
  onTime: 1000 * 60 * 60 * 24 * 3,
  farOut: 1000 * 60 * 60 * 24 * 7,
};



const projectBackgroud = (timeLeft, colorTime) => {
  Object.keys(colorTime).forEach((option) => {
    if (timeLeft < colorTime[option]) {
        console.log('===\n\n\ntest\n\n\n===')
        console.log("1", colorTime[option])
    }
  });
};
console.log(projectBackgroud(1570498, timeOptions, colorOptions))
