const selectedStatus = document.querySelectorAll(".status");
const id = document.getElementsByClassName("status");

function updateFunction(e) {
  let taskStatus = "";
  console.log("selectedStatus:", selectedStatus.selectedIndex);
  if (e.target.value == "1") {
    taskStatus = "1";
  } else if (e.target.value == "2") {
    taskStatus = "2";
  } else if (e.target.value == "3") {
    taskStatus = "3";
  }
  const body = {
    status: taskStatus,
  };
  const response = fetch(`/api/tasks/${e.target.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(location.reload());
}

for (let i = 0; i < id.length; i++) {
  const element = id[i];
  element.addEventListener("change", updateFunction);
}

document.querySelector("#new-task").addEventListener("click", async (event) => {
  event.preventDefault();
  const projId = document.querySelector("#project").dataset.id;

  location.href = `/create_tasks/${projId}`;
});

const completeBtn = document.querySelectorAll(".taskCompleted");
completeBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const taskId = document.querySelector(".task-card").dataset.id;
    event.preventDefault();
    console.log("this is the id", taskId);
    const response = fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  });
});
