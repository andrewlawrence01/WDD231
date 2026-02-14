function submitForm(event) {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  let error = "";

  if (nameInput.value.trim() === "") {
    error += "Name is required.\n";
  }

  if (emailInput.value.trim() === "") {
    error += "Email is required.\n";
  } else if (!validateEmail(emailInput.value.trim())) {
    error += "Please enter a valid email address.\n";
  }

  if (error) {
    event.preventDefault();
    document.getElementById("form-error").textContent = error;
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document
  .getElementById("contact-form")
  .addEventListener("submit", submitForm);