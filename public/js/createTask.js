document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const projID = document.querySelector("#title").dataset.id;

  const taskObj = {
    name: document.querySelector("#task-name").value,
    due_date: dayJs(document.querySelector("#due-date").value).format(
      "MMMM, DD, YYYY"
    ),
    description: document.querySelector("#description").value,
    status: null,
    ProjectId: projID,
  };
  console.log(taskObj);
  fetch("/api/tasks", {
    method: "POST",
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
