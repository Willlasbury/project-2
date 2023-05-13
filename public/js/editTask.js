document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   const projID = document.querySelector("#title").dataset.id;
  const projEl = document.getElementById("title");
  const projID = projEl.getAttribute("data-id");
  const taskID = document.querySelector("button").id;

  const taskObj = {
    name: document.querySelector("#task-name").value,
    due_date: document.querySelector("#due-date").value,
    description: document.querySelector("#description").value,
    ProjectId: projID,
  };
  fetch(`/api/tasks/${taskID}`, {
    method: "PUT",
    body: JSON.stringify(taskObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json()
    
    console.log("data:", data)
    if (res.ok) {
      location.href = `/project/${projID}`;
    } else {
      alert("You have an error");
    }
  });
});
