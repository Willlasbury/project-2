document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   const projID = document.querySelector("#title").dataset.id;
  const projID = document.querySelector("[data-id]");
  console.log("projID:", projID);
  const taskID = document.querySelector("button").id;
  console.log("taskId:", taskID);

  const taskObj = {
    name: document.querySelector("#task-name").value,
    due_date: document.querySelector("#due-date").value,
    description: document.querySelector("#description").value,
    ProjectId: projID,
  };
  console.log(taskObj);
  fetch(`/api/task/${e.target.id}`, {
    method: "PUT",
    body: JSON.stringify(taskObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = `/project/${projID}`;
    } else {
      alert("You have an error");
    }
  });
});
