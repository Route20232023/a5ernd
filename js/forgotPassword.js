let emailInput = document.getElementById("emailInput");
const forgotPassword = document.getElementById("forgotPassword");

forgotPassword.addEventListener("submit", async function (e) {
  e.preventDefault();

  let test = {
    email: emailInput.value,
  };
  console.log(test);
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Account/ForgetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify({
          email: emailInput.value,
        }),
      }
    );
    if (res.ok) {
      // Login successful
      let data = await res.json();
      // Do something for a successful Login
      console.log(data);
      console.log("All done");

    //   localStorage.setItem("userToken", data.token);
    } else {
      // Login failed
      let errorData = await res.json();
      console.log(errorData);
      console.log("not done");
    }
  } catch (err) {
    console.log(err, "er");
  }
});
