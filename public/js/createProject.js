document.querySelector("form").addEventListener("submit", event=>{
    event.preventDefault();
    const projectObj = {
        title: document.querySelector("#project").value,
        due_date: document.querySelector("#due-date").value,
    }
    console.log(projectObj);
    fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(projectObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res =>{
        if(res.ok){
            location.href = "/create_tasks"
        } else{
            alert("You have an error")
        }
    })
})