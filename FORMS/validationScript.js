const form = document.getElementById("myForm");
const inputField = document.getElementById("inputField");

form.addEventListener("submit", function () {
  validateInput();
})

function validateInput() {
  const regexPattern = new RegExp("^[a-zA-Z0-9]+$");
  if (regexPattern.test(inputField.value) == false) {
    alert("Invalid input");
    event.preventDefault();
  } else {
    alert("Form Submitted!");
  }
}