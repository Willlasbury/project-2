const signUpForm = document.querySelector("#signup-form");
const password = document.querySelector('#user-password').value
const passConfim = document.querySelector('#user-password-confirmation').value

console.log('===\n\n\ntest\n\n\n===')

const checkPassword = (pass1, pass2) => {
    if (pass1 === pass2){
        return true
    } else {
        return false
    }
}



signUpForm.addEventListener("submit", async (event) => {
    try {

        console.log("checkPassword(password):", checkPassword(password,passConfim))


    
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