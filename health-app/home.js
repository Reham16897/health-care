// ✅ استقبال الفورم
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // منع الإرسال التلقائي

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    // ✅ رسالة ترحيب مؤقتة
    alert(`Welcome, ${email}! You are now logged in.`);

    // ✅ لاحقًا: إرسال البيانات لـ backend
    // fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  });
});