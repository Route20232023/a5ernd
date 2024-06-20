// camps with details


let campsWrapper = document.getElementById("campsWrapper");
async function getAllCamps() {
  let res = await fetch(
    "https://junglejamboree.runasp.net/api/Camp/GetAllCamps"
  );
  let data = await res.json();
  console.log(data);
  displayCamps(data);
}
getAllCamps();

function displayCamps(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    let imgDesc =
      data[i].description == "WinterCamp"
        ? "./img/winter-camp.jpg"
        : data[i].description == "SummerCamp"
        ? "./img/summer camp.jpg"
        : data[i].description == "HalloweenCamp"
        ? "./img/haloween-camp.jpg"
        : "./img/Spring-camp.jpg";

    cartoona += `
     <div class="col-lg-4 col-md-6 wow fadeInUp ${data[i].isActive == false ? 'opacity-30':""}" data-wow-delay="0.1s" id="Hello">
            <div class="classes-item">
              <div class="bg-light rounded-circle w-75 mx-auto p-3">
                <img
                  class="w-100 imageCamp"
                  src="${imgDesc}"
                  alt=""
                />
              </div>
              <div class="bg-light rounded p-4 pt-5 mt-n5">
                <a class="d-block text-center h3 mt-3 mb-4 ${data[i].isActive == true ? "" : 'pointer-none'}"  href="${data[i].isActive == false ? "" :`campDetails.html?id=${data[i].id}`}"
                  >${data[i].description}</a
                >
                  <p class="text-center">${data[i].campType}</p>
                <div class="row g-1">
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-primary pt-2">
                      <h6 class="text-primary mb-1">Age:</h6>
                      <small>${data[i].ageRange} Years</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-success pt-2">
                      <h6 class="text-success mb-1">Start Date / End Date</h6>
                      <small>${new Date(data[i].startDate).toLocaleString(
                        "en-us",
                        { dateStyle: "medium" }
                      )} / ${new Date(data[i].endDate).toLocaleString("en-us", {
      dateStyle: "medium",
    })}</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-warning pt-2">
                      <h6 class="text-warning mb-1">Capacity:</h6>
                      <small>${data[i].capacity} Kids</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-info pt-2">
                      <h6 class="text-info mb-1">Location:</h6>
                      <small>${data[i].locationName}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  }
  campsWrapper.innerHTML = cartoona;
}


































// Camps With Details End

/* slider */

let vedios = document.querySelectorAll(".landing-page .slideVed video");
let btns = document.querySelectorAll(".landing-page .bullets div ");
let burger = document.querySelectorAll(".landing-page .header .fa-bars");
navburgerToglle = document.querySelector(".landing-page .header nav");
//function for display floating nav links in small screens
let displayX = function (e) {
  e.classList.toggle("fa-times");
  navburgerToglle.classList.toggle("active");
};
// console.log(navburgerToglle);
// console.log(burger);
//############################//
//for carousel
btns.forEach((e, i) => {
  e.addEventListener("click", () => {
    //remove all classes from bullets
    btns.forEach((ele) => {
      ele.classList.remove("on");
      // console.log(i)
    });
    //put class avtive in the ele clicked
    e.classList.add("on");
    //delete active class from vedio
    vedios.forEach((ved) => {
      ved.classList.remove("active");
    });
    vedios[i].classList.add("active");
  });
});
