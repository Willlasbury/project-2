document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   const projID = document.querySelector("#title").dataset.id;
  const projEl = document.getElementById("title");
  console.log("projEl:", projEl);
  const projID = projEl.getAttribute("data-id");

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
  fetch(`/api/tasks/${taskID}`, {
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
