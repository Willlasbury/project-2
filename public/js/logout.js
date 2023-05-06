const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    console.log("test")
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });
    console.log("response:", response)
    if (response.ok) {
      location.reload();
    } else {
      alert("some error");
    }
  } catch (err) {}
});
