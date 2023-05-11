const displayTime = () => {
  const timeLeftDisplay = document.querySelectorAll(".time-left");
  
  for (let i = 0; i < timeLeftDisplay.length; i++) {
    const item = timeLeftDisplay[i];
    let dueDate = Number(item.textContent);
    if (dueDate < 0) {
      item.textContent = `LATE`;
    }
    else if (dueDate < 1000 * 60 * 60 * 48) {
      const hourTime = Math.floor(dueDate / (1000 * 60 * 60));
    } else {
      const dayTime = Math.floor(dueDate / (1000 * 60 * 60 * 24));
      item.textContent = `${dayTime} days left`;
    }
  }
};

const runTimer = () => {
  setInterval(displayTime, 60000);
};
displayTime();
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

runTimer();
