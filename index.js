const ageForm = document.getElementById("ageForm");
//-------------input-------------
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
//------------output-----------
const outputYear = document.getElementById("YY");
const outputMonth = document.getElementById("MM");
const outputDay = document.getElementById("DD");
//----------errors--------------
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

const labelTag = document.getElementsByTagName("label");
const inputTag = document.getElementsByTagName("input");

//-----------prevent defalt submition-----------
ageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateAndCalculateAge();
});

function validateAndCalculateAge() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Reset errors
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  for (var i = 0; i < 3; i++) {
    labelTag[i].style.color = "var(--Smokey-grey)";
    inputTag[i].style.border = "1px solid var(--Light-grey)";
  }

  //commen error
  function commenerror() {
    for (var i = 0; i < 3; i++) {
      labelTag[i].style.color = "var(--Light-red)";
      inputTag[i].style.border = "1px solid var(--Light-red)";
    }
  }

  // Validate day, month, and year
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    dayError.textContent = "This field is required.";
    monthError.textContent = "This field is required.";
    yearError.textContent = "This field is required.";
    commenerror();
    return;
  }
  //----------------------day-------------------------------
  if (day < 1 || day > 31) {
    dayError.textContent = "Must be a valid day";
    commenerror();
    return;
  }
  const daysInMonth = new Date(year, month, 0).getDate();

  if (day > daysInMonth) {
    dayError.textContent = `Invalid date for ${getMonthName(month)}.`;
    commenerror();
    return;
  }
  function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month - 1];
  }
  //-------------------month------------------------------
  if (month < 1 || month > 12) {
    monthError.textContent = "Must be a valid month";
    commenerror();
    return;
  }
  //-------------------year-------------------------------
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);

  if (inputDate > currentDate) {
    yearError.textContent = "Must be in the past.";
    commenerror();
    return;
  }

  // -------------Calculate age------------------------
  const diff = currentDate - inputDate;
  const ageDate = new Date(diff);
  const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
  const ageMonths = ageDate.getUTCMonth();
  const ageDays = ageDate.getUTCDate() - 1;

  // --------------Display age-------------------------
  outputYear.textContent = ageYears;
  outputMonth.textContent = ageMonths;
  outputDay.textContent = ageDays;
}
