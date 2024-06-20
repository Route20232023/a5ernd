//! childs inputs
const gender = document.getElementsByName("gender");
const fNameInput = document.getElementById("fNameInput");
const lNameInput = document.getElementById("lNameInput");
const dateInput = document.getElementById("dateInput");
const emergencyContctInput = document.getElementById("emergencyContctInput");

//! childs inputs

const childForm = document.getElementById("childForm");
const childContaniner = document.getElementById("childContainer");

//! child alerts
const firstNameAlert = document.getElementById("firstNameAlert");
const secondNameAlert = document.getElementById("secondNameAlert");
const dateAlert = document.getElementById("dateAlert");
const emergencyContactAlert = document.getElementById("emergencyContactAlert");
const genderAlert = document.getElementById("genderAlert");

//! child alerts
console.log(childForm);
console.log(gender);
getChilds();

childForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if(localStorage.getItem('userToken')){
    let selectedGender;
    for (const genderInput of gender) {
      if (genderInput.checked) {
        selectedGender = genderInput.value;
        break;
      }
    }
  
    let date = new Date(dateInput.value);
    console.log(dateInput.value);
    console.log(date.getFullYear());
    console.log(date.getMonth() + 1, "month");
    console.log(date.getDate());
  
    let newChild = {
      fName: fNameInput.value,
      lname: lNameInput.value,
      emergencyContact: emergencyContctInput.value,
      gender: +selectedGender,
      dob: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    };
    console.log(newChild);
  
    console.log(`Bearer ${localStorage.getItem("userToken")}`);
    //& check validation
    if (checkAllChildsInputsAreValid()) {
      try {
        let res = await fetch(
          `https://junglejamboree.runasp.net/api/Child/AddChild`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify(newChild),
          }
        );
  
        // Check the response content type
        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          data = await res.text();
        }
  
        console.log(data);
        getChilds();
        if (res.ok) {
          Swal.fire({
            title: "Good job!",
            text: `Child Added Successfully`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Your Are Not Authorized !!!",
            text: `You Must Sign In First`,
            icon: "error",
          });
        }
      } catch (err) {
        console.log(err, "error");
      }
    }
  
    //& check validation
  }else{
    Swal.fire({
      title: "You Are Not Authorized",
      text: `Please Login First`,
    });
  }
  
});

// get childs

async function getChilds() {
  let res = await fetch(
    "https://junglejamboree.runasp.net/api/Child/GetChildren",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  let data = await res.json();
  console.log(data);
  displayData(data);
}

function displayData(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
<div class="col-md-4">
            <div class="card text-center">
              <i class="fa-solid fa-child fa-5x mx-auto p-4 main-color"></i>
              <div class="card-body">
                <h5 class="card-title">${data[i].fName} ${data[i].lname}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${
                  data[i].gender == 1 ? "Male" : "Female"
                }</li>
                <li class="list-group-item">${data[i].dob.year}/${
      data[i].dob.month
    }/${
      data[i].dob.day
    } <i class="fa-solid fa-cake-candles main-color"></i></li>
                <li class="list-group-item">Emergency Contact : ${
                  data[i].emergencyContact
                } </li>
              </ul>
              <div class="card-body">
                 <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addIdToDataModal(${
                   data[i].id
                 })">Update</button>
                <button class="btn btn-primary my-3 w-100" onclick="deleteChild(${
                  data[i].id
                })">Delete</button>
                <a class="btn btn-primary  w-100 d-block" href="./childDetails.html?id=${
                  data[i].id
                }">Additional Details</a>
              </div>
            </div>
          </div>

    `;
  }
  childContaniner.innerHTML = cartoona;
}

async function deleteChild(id) {
  console.log(id);

  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Child/DeleteChild?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    // Check the response content type
    const contentType = res.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    console.log(data);
    getChilds();
    Swal.fire({
      title: "Good job!",
      text: `Child Deleted Successfully`,
      icon: "success",
    });
  } catch (err) {
    console.log(err, "error");
  }
}

function addIdToDataModal(id) {
  document.getElementById("saveChanges").setAttribute("data-id", id);
}

document.getElementById("saveChanges").addEventListener("click", function () {
  console.log(document.getElementById("saveChanges").getAttribute("data-id"));
  upadateChild();
});

let gendersUpdate = document.getElementsByName("genderUpdate");
async function upadateChild(id) {
  console.log(id);
  let selectedGender;
  for (const genderInput of gendersUpdate) {
    if (genderInput.checked) {
      selectedGender = genderInput.value;
      break;
    }
  }

  let dateUpadte = new Date(dateInputUpadate.value);
  console.log(dateUpadte.getFullYear());
  console.log(dateUpadte.getMonth() + 1, "month");
  console.log(dateUpadte.getDate());

  let updatedChild = {
    id: +document.getElementById("saveChanges").getAttribute("data-id"),
    fName: fNameInputUpdate.value,
    lname: lNameInputUpdate.value,
    emergencyContact: emergencyContctUpadate.value,
    gender: +selectedGender,
    dob: {
      year: dateUpadte.getFullYear(),
      month: dateUpadte.getMonth() + 1,
      day: dateUpadte.getDate(),
    },
  };
  console.log(updatedChild);
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Child/UpdateChild`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(updatedChild),
      }
    );
    //   let data = await res.json();

    // Check the response content type
    const contentType = res.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    getChilds();
    console.log(data);
    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if(data.errors){
    Swal.fire({
      title: "Invalid Data",
      text: `Please Enter Valid Data`,
      icon: "error",
    });
    }else{
      console.log('yes');
      Swal.fire({
      title: "Good job!",
      text: `Data Updated Successfully`,
      icon: "success",
    });
    modal.hide();
    }
    
  } catch (err) {
    console.log('NOOOOO');
    console.log(err, "error");
  }
}

//! Start Validation

function allValidationChildsInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkAllChildsInputsAreValid() {
  if (
    allValidationChildsInputs(/^[a-zA-Z]{2,}$/, fNameInput, firstNameAlert) &&
    allValidationChildsInputs(/^[a-zA-Z]{2,}$/, lNameInput, secondNameAlert) &&
    isDateSelected() &&
    isGenderSelected() &&
    allValidationChildsInputs(
      /^[1-9][0-9]*$/,
      emergencyContctInput,
      emergencyContactAlert
    )
  ) {
    console.log("valid yrys");
    return true;
  } else {
    console.log("no valid y3m");
    return false;
  }
}

function isDateSelected() {
  const selectedDate = dateInput.value;
  if (!selectedDate) {
    // Date is not selected
    console.log("date is not selected");
    dateAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    console.log("date selected");
    dateAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isGenderSelected() {
  const genderOptions = gender;
  for (let i = 0; i < genderOptions.length; i++) {
    if (genderOptions[i].checked) {
      // Gender is selected
      console.log("gender is selected");
      genderAlert.classList.replace("d-block", "d-none");
      return true;
    }
  }
  // Gender is not selected
  console.log("gender is not selected");
  genderAlert.classList.replace("d-none", "d-block");
  return false;
}
//! End Validation
