// =========================
// Project Proposal Data
// =========================

const projectProposal = {
  projectName: "HabitForge",
  description:
    "HabitForge is a responsive web application that helps users create, track, and maintain daily habits using modern front-end techniques and strong UX principles.",
  targetAudience:
    "Students, young professionals, and anyone interested in productivity and self-improvement.",
  features: [
    "Create and manage daily habits",
    "Track habit completion",
    "View habit progress over time",
    "Persistent data using Local Storage",
    "Motivational UI feedback and animations"
  ],
  wireframes: [
    {
      view: "Mobile View",
      description:
        "Header with app title, vertical habit cards, floating add button, and bottom navigation."
    },
    {
      view: "Wide Screen View",
      description:
        "Sidebar navigation, dashboard layout with habit cards, and a progress summary panel."
    }
  ],
  requirements: {
    "Detailed Validated Form":
      "Used to add and edit habits with required fields and input validation.",
    "Local Storage":
      "Stores habits, completion status, and user preferences for persistence.",
    "API / JSON Data":
      "Motivational quotes loaded from a local JSON file.",
    "Drop-down Menus":
      "Habit frequency and priority selection.",
    "CSS Animations":
      "Progress bars, button hover effects, and success indicators.",
    "Responsive Design":
      "Mobile-first layout using Flexbox, Grid, and media queries.",
    "UX & Accessibility":
      "Semantic HTML, keyboard support, and ARIA labels.",
    "URL Parameters":
      "habit-details.html?id=3 used to load individual habit data.",
    "Modules":
      "Separate JavaScript modules for storage, UI rendering, and form handling."
  }
};

// =========================
// DOM Rendering
// =========================

document.getElementById("project-name").textContent =
  projectProposal.projectName;

document.getElementById("project-description").textContent =
  projectProposal.description;

document.getElementById("target-audience").textContent =
  projectProposal.targetAudience;

// Features
const featuresList = document.getElementById("features-list");
projectProposal.features.forEach(feature => {
  const li = document.createElement("li");
  li.textContent = feature;
  featuresList.appendChild(li);
});

// Wireframes
const wireframesDiv = document.getElementById("wireframes");
projectProposal.wireframes.forEach(wireframe => {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${wireframe.view}:</strong> ${wireframe.description}`;
  wireframesDiv.appendChild(div);
});

// Requirements
const requirementsList = document.getElementById("requirements");
for (const [key, value] of Object.entries(projectProposal.requirements)) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${key}:</strong> ${value}`;
  requirementsList.appendChild(li);
}