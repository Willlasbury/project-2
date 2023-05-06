const loginForm = document.querySelector("#login-form");
const signUpForm = document.querySelector("#signup-form");

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
      alert("some error");
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
      name: document.querySelector("#user-name").value,
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
