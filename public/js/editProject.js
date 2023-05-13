document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const projectId = document.querySelector("#project-section").dataset.id;

  const projObj = {
    title: document.querySelector("#project").value,
    due_date: document.querySelector("#due-date").value,
  };
  fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(projObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = `/project/${projectId}`;
    } else {
      alert("You have an error");
    }
  });
});
