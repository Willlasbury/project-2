document.querySelector("form").addEventListener("submit", event=>{
    event.preventDefault();
   const projID = document.querySelector("#title").dataset.id;

    const taskObj = {
        name: document.querySelector("#task-name").value,
        due_date: document.querySelector("#due-date").value,
        description: document.querySelector("#description").value,
        status: 1,
        ProjectId: projID
    }
    console.log(taskObj);
    fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res =>{
        if(res.ok){
            location.href = `/project/${projID}`
        } else{
            alert("You have an error")
        }
    })
})