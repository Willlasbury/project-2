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
  console.log("response:", response)
  const projectData = await response.json();
  const id = projectData.id;
  if (response.ok) {
    location.href = `/create_tasks/${id}`;
  } else {
    alert("You have an error");
  }
});
