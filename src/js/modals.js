// Grab elements from the DOM
const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector(".close-button");

// Open modal
function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// Close modal
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Event listeners
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

// Close when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close when Escape key is pressed
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});