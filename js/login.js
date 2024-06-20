// https://junglejamboree.runasp.net/    Base Url

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const loginUser = document.getElementById("loginUser");

//! alert inputs
let loginEmailAlert = document.getElementById("loginEmailAlert");
let loginPasswordAlert = document.getElementById("loginPasswordAlert");
//! alert inputs

loginUser.addEventListener("submit", async function (e) {
  e.preventDefault();

  let test = {
    email: emailInput.value,

    password: passwordInput.value,
  };
  console.log(test);
  if (checkIfAllLoginInputsAreValid()) {
    try {
      let res = await fetch(
        `https://junglejamboree.runasp.net/api/Account/Login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
          body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
          }),
        }
      );
      if (res.ok) {
        // Login successful
        let data = await res.json();
        // Do something for a successful Login
        console.log(data);
        console.log("All done");
        Swal.fire({
          title: "Good job!",
          text: "Your are Successfully Login , You Will be Redirect to Home",
          icon: "success",
        });
        localStorage.setItem("userToken", data.token);
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        // Login failed
        let errorData = await res.json();
        console.log(errorData);
        Swal.fire({
          title: "Somthing Went Wrong!",
          text:
            errorData.message == "you are not Authorized"
              ? "Email Or Password Is Not Correct"
              : "All Inputs Are Required",
          icon: "error",
        });
        console.log("not done");
      }
    } catch (err) {
      console.log(err, "er");
    }
  }
});

function loginValidationInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

// /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/

function checkIfAllLoginInputsAreValid() {
  if (
    loginValidationInputs(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      emailInput,
      loginEmailAlert
    ) &&
    loginValidationInputs(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,}).*$/,
      passwordInput,
      loginPasswordAlert
    )
  ) {
    console.log("all inputt valid");
    return true;
  } else {
    console.log("somthing wrong in inputs");
    return false;
  }
}
