const displayTime = () => {
  const timeLeftDisplay = document.querySelectorAll(".time-left");
  const timeLeftSpan = document.querySelectorAll('.time-left-span');

  for (let i = 0; i < timeLeftDisplay.length; i++) {
    const item = timeLeftDisplay[i];
    const span = timeLeftSpan[i]

    let dueDate = Number(item.textContent);
    if (dueDate < 0) {
      item.textContent = `LATE`;
    } else if (dueDate < 1000 * 60 * 60 * 48) {
      console.log("item:", item);
      const hourTime = Math.floor(dueDate / (1000 * 60 * 60));
      item.textContent = `${hourTime}`;
      span.textContent = 'hours left'
    } else {
      const dayTime = Math.floor(dueDate / (1000 * 60 * 60 * 24));
      item.textContent = `${dayTime}`
      span.textContent = 'days left'
      ;
    }
  }
};

// const runTimer = () => {
//   setInterval(displayTime, 60000);
// };

displayTime();
// runTimer();



document
  .querySelector("#project-completed")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const projectId = document.querySelector("#project").dataset.id;
    console.log("projectId:", projectId);
    const response = fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  });
