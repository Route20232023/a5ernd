// {
//     "fName": "abdullah",
//     "lname": "mohamed",
//     "gender": 1,
//     "address": "helwan",
//     "dob": {
//       "year": 2002,
//       "month": 9,
//       "day": 22
//     },
//     "oldPassword": "Ahmed@1234",
//     "password": "Reda@1234",
//     "confirmPassword": "Reda@1234"
//   }

// http://junglejamboree.runasp.net/    Base Url

const fNameInput = document.getElementById("fNameInput");
const lNameInput = document.getElementById("lNameInput");
const emailInput = document.getElementById("emailInput");
const dateInput = document.getElementById("dateInput");
const passwordInput = document.getElementById("passwordInput");
const confPasswordInput = document.getElementById("confPasswordInput");
const oldPasswordInput = document.getElementById("oldPasswordInput");
const addressInput = document.getElementById("addressInput");
const gender = document.getElementsByName("gender");
const editProfileForm = document.getElementById("editProfileForm");

editProfileForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let date = new Date(dateInput.value);
  console.log(dateInput.value);
  console.log(date.getFullYear());
  console.log(date.getMonth() + 1, "month");
  console.log(date.getDate());
  let selectedGender;
  for (const genderInput of gender) {
    if (genderInput.checked) {
      selectedGender = genderInput.value;
      break;
    }
  }
  console.log(selectedGender);

  let userEditedData = {
    address: addressInput.value,
    confirmPassword: confPasswordInput.value,
    dob: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    fName: fNameInput.value,
    gender: +selectedGender,
    lname: lNameInput.value,
    password: passwordInput.value,
    oldPassword: oldPasswordInput.value,
  };
  console.log(userEditedData);

  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Account/UpdateUserInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(userEditedData),
      }
    );
    if (res.ok) {
      // Registration successful
      let data = await res.json();
      // Do something for a successful registration
      console.log(data);
      console.log("All done");
      setTimeout(function () {
        window.location.href = "./profile.html";
      }, 2000);
    } else {
      // Registration failed
      let errorData = await res.json();
      console.log(errorData);
      console.log("not done");
    }
  } catch (err) {
    console.log(err, "er");
  }
});

// na2s validation
