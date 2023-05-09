const loginForm = document.querySelector("#login-form");


loginForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    const user = {
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    };

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      location.href = "/";
    } else {
      alert("Username or password was incorrect");
    }
  } catch (err) {
    console.log("error:", error);
    alert(err);
  }
});

signUpForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const newUser = {
      userName: document.querySelector("#user-name").value,
      email: document.querySelector("#user-email").value,
      password: document.querySelector("#user-password").value,
    };


    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    console.log("response:", response)
    if (response.ok) {
      location.href = "/";
    } else {
      alert("some error");
    }
  } catch (err) {
    console.log("error:", error);
    alert(err);
  }
});
