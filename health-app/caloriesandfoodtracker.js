// دالة حساب السعرات للأكل (مثال بسيط)
function checkCalories() {
  const food = document.getElementById("foodInput").value.toLowerCase();
  let calories;

  switch(food) {
    case "apple":
      calories = 95;
      break;
    case "pizza":
      calories = 285;
      break;
    case "rice":
      calories = 206;
      break;
    default:
      calories = "Unknown food item";
  }

  document.getElementById("calorieResult").innerHTML =
    calories === "Unknown food item"
      ? "⚠️ Food not found in database."
      : `🍽️ Estimated calories in ${food}: <strong>${calories} kcal</strong>`;
}

// دالة حساب السعرات اليومية باستخدام معادلة Mifflin-St Jeor
function calculateDailyCalories() {
  const age = parseInt(document.getElementById("ageInput").value);
  const height = parseInt(document.getElementById("heightInput").value);
  const weight = parseInt(document.getElementById("weightInput").value);

  if (!age || !height || !weight) {
    document.getElementById("dailyCalorieResult").innerHTML =
      "⚠️ Please enter all your details.";
    return;
  }

  // معادلة BMR للرجال (لو عايزة للنساء نطرح 161 بدل +5)
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;

  // نفترض نشاط متوسط (×1.55)
  const dailyCalories = Math.round(bmr * 1.55);

  document.getElementById("dailyCalorieResult").innerHTML =
    `✅ Estimated daily calories: <strong>${dailyCalories} kcal</strong>`;
}