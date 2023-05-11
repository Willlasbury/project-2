const selectedStatus = document.querySelectorAll(".status");
// const taskForm = document.querySelectorAll(".status");
const id = document.getElementsByClassName("status");

function updateFunction(e) {
  console.log("e.target:", e.target.id);
  console.log(e.target.value);
  console.log("e:", e);
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
  console.log("body:", body);
  console.log("taskStatus:", taskStatus);
  const response = fetch(`/api/tasks/${e.target.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  location.reload();
}

for (let i = 0; i < id.length; i++) {
  const element = id[i];
  console.log("element:", element);
  element.addEventListener("change", updateFunction);
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const projectObj = {
    title: document.querySelector("#project").value,
    due_date: document.querySelector("#due-date").value,
  };
  const response = await fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(projectObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const projectData = await response.json();
  const id = projectData.id;
  if (response.ok) {
    location.href = `/create_tasks/${id}`;
  } else {
    alert("You have an error");
  }
});
