const displayTime = () => {
  const timeLeftDisplay = document.querySelector("#time-left");
  let dueDate = Number(timeLeftDisplay.textContent)


  
  if (dueDate < 1000*60*60*48 ) {
    const hourTime = Math.floor((dueDate / (1000*60*60)))
    return timeLeftDisplay.textContent = `${hourTime} hours left`
  } else {
    const dayTime = Math.floor(dueDate / (1000*60*60*24))
    timeLeftDisplay.textContent = `${dayTime} days left`
  }
};

const runTimer = () => {
  
  setInterval(displayTime, 60000);
}
displayTime()
const colorTime = {
  due: 1000 * 60 * 60 * 24,
  onTime: 1000 * 60 * 60 * 24 * 3,
  farOut: 1000 * 60 * 60 * 24 * 7,
};

const projectBackgroud = (timeLeft, colorTime) => {
  Object.keys(colorTime).forEach((option) => {
    if (timeLeft < colorTime[option]) {
      console.log("===\n\n\ntest\n\n\n===");
      console.log("1", colorTime[option]);
    }
  });
};

runTimer()