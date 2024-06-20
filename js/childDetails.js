const addAlgBtn = document.getElementById("addAlgBtn");
const addMedicalBtn = document.getElementById("addMedicalBtn");
let childDetail;
let id;
getIdParam();
getChildDetails();
addAlgBtn.addEventListener("click", addAlg);
addMedicalBtn.addEventListener("click", addMedicalCond);
async function getChildDetails() {
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Child/GetChildById?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    childDetail = await res.json();
    console.log(childDetail);
    displayChildDetails();
  } catch (err) {
    console.log(err);
  }
}
function getIdParam() {
  const detialsWrapper = document.getElementById("detialsWrapper");
  // Get the current URL
  const url = new URL(window.location.href);

  // Get the value of the 'id' parameter
  id = +url.searchParams.get("id");
}

function displayChildDetails() {
  childDetail.gender == 1
    ? childImg.setAttribute("src", "./img/child user.png")
    : childImg.setAttribute("src", "./img/child user girl.png");
  childName.innerHTML = `${childDetail.fName} ${childDetail.lname}`;
  childEmergency.innerHTML = childDetail.emergencyContact;
  childGender.innerHTML = childDetail.gender == 1 ? "Male" : "Female";
  childBirth.innerHTML = calculateAge(childDetail.dob);
  medicalList.innerHTML = childDetail.medicalConditions.map((mc) => {
    return ` <li><span class="fw-bold text-black ">${mc}</span><i class="fa-solid fa-trash mx-3 text-danger" onclick="deleteMedicalCond('${mc}')"></i></li>`;
  });
  algList.innerHTML = childDetail.allergies.map((al) => {
    return ` <li><span class="fw-bold text-black ">${al}</span><i class="fa-solid fa-trash mx-3 text-danger" onclick="deleteAlg('${al}')"></i></li>`;
  });
}
async function addAlg() {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/AddAllergis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          allergies: algInput.value,
          allergiesDescreption: algDesc.value,
        }),
      }
    );
    let data = await res.json();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Good job!",
          text: `Allergies Added Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
async function addMedicalCond() {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/AddMedicalCondition",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          medicalConditions: medicalInput.value,
          medicalConditionsDescreption: medicalDesc.value,
        }),
      }
    );
    let data = await res.json();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Good job!",
          text: `Medical Condition Added Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
async function deleteAlg(algName) {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/DeleteAllergis",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          allergies: algName,
          allergiesDescreption: "test",
        }),
      }
    );
    let data = await res.text();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Good job!",
          text: `Allergies Deleted Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
async function deleteMedicalCond(medicalName) {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/DeleteMedicalCondition",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          medicalConditions: medicalName,
          medicalConditionsDescreption: "test",
        }),
      }
    );
    let data = await res.text();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Good job!",
          text: `Medical Condition Deleted Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
function calculateAge(dob) {
  // Get the current date
  var currentDate = new Date();

  // Extract the year, month, and day from the DOB object
  var year = dob.year;
  var month = dob.month - 1; // Months in JavaScript are zero-based (0-11)
  var day = dob.day;

  // Create a new Date object with the DOB
  var birthDate = new Date(year, month, day);

  // Calculate the age
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--; // Subtract 1 from the age
  }

  return age;
}
