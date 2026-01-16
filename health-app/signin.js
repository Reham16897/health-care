const signupForm = document.querySelector(".signin-form form");

signupForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // Required fields
  const email = document.getElementById("email").value.trim();
  const fullname = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Optional fields
  const age = document.getElementById("age") ? document.getElementById("age").value.trim() : "";
  const height = document.getElementById("height") ? document.getElementById("height").value.trim() : "";
  const weight = document.getElementById("weight") ? document.getElementById("weight").value.trim() : "";
  const gender = document.getElementById("gender") ? document.getElementById("gender").value : "";

  // Password check
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Build user data object
  const userData = {
    email: email,
    fullname: fullname,
    password: password,
    age: age || "Not provided",
    height: height || "Not provided",
    weight: weight || "Not provided",
    gender: gender || "Not provided"
  };

  // For testing: log data
  console.log("User Data:", userData);
  alert("Account created successfully!");

  // Reset form
  signupForm.reset();
});