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
    let data = await res.json()
    console.log(data); 
    if(data.statusCode ==200){
      console.log('Sent');
      Swal.fire({
          title: "Email Sent Successfully",
          text: "Check Your E-mail",
          icon: "success",
        });
    }else{
      console.log('Not Sent');
      Swal.fire({
        title: "Invalid Email Aress",
        text: "Please Enter Exist Email",
        icon: "error",
      });
      
    }
  } catch (err) {
    console.log(err, "er");

  }
});
