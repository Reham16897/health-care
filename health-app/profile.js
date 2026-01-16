// Get DOM elements
const loginForm = document.getElementById("loginForm");
const loginContainer = document.getElementById("login-container");
const profileContainer = document.getElementById("profile-container");
const profileName = document.getElementById("profileName");
const profileAge = document.getElementById("profileAge");
const profileHeight = document.getElementById("profileHeight");
const profileWeight = document.getElementById("profileWeight");
const profileGender = document.getElementById("profileGender");
const analysisList = document.getElementById("analysisList");
const logoutBtn = document.getElementById("logoutBtn");

// Example user data (this could come from signup or database)
const userData = {
  name: "H",
  age: 2,
  height: 165,
  weight: 60,
  gender: "Female",
  analysis: [
    "Blood test: Normal",
    "Vitamin D: Slightly low",
    "Cholesterol: Within range"
  ]
};

// Handle login
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // Example: always successful login
  loginContainer.classList.add("hidden");
  profileContainer.classList.remove("hidden");

  // Fill profile data
  profileName.textContent = userData.name;
  profileAge.textContent = userData.age || "Not provided";
  profileHeight.textContent = userData.height || "Not provided";
  profileWeight.textContent = userData.weight || "Not provided";
  profileGender.textContent = userData.gender || "Not provided";

  // Fill analysis list
  analysisList.innerHTML = "";
  userData.analysis.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    analysisList.appendChild(li);
  });
});

// Handle logout
logoutBtn.addEventListener("click", function() {
  profileContainer.classList.add("hidden");
  loginContainer.classList.remove("hidden");
  loginForm.reset();
});