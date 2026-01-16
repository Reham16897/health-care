// medicalanalysis.js

document.addEventListener("DOMContentLoaded", () => {
  const testType = document.getElementById("testType");
  const testValue = document.getElementById("testValue");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const resultBox = document.getElementById("resultBox");

  // Update placeholder based on selected test
  const updatePlaceholder = () => {
    const type = testType.value;
    switch (type) {
      case "cbc":
        testValue.placeholder = "Enter Hemoglobin (g/dL), e.g., 13.5";
        break;
      case "vitaminD":
        testValue.placeholder = "Enter Vitamin D (ng/mL), e.g., 35";
        break;
      case "glucose":
        testValue.placeholder = "Enter Fasting Glucose (mg/dL), e.g., 92";
        break;
      case "bp":
        testValue.placeholder = "Enter BP as 120/80 (systolic/diastolic)";
        break;
      default:
        testValue.placeholder = "Enter your result";
    }
    // Reset states
    testValue.classList.remove("input-error", "input-ok");
    resultBox.textContent = "";
  };

  // Simple validation
  const validateInput = () => {
    const type = testType.value.trim();
    const value = testValue.value.trim();
    if (!type) {
      resultBox.textContent = "⚠️ Please select a test.";
      testValue.classList.remove("input-ok");
      return false;
    }
    if (!value) {
      resultBox.textContent = "⚠️ Please enter a value.";
      testValue.classList.add("input-error");
      return false;
    }

    if (type === "bp") {
      // Expect format "120/80"
      const parts = value.split("/");
      if (parts.length !== 2) {
        resultBox.textContent = "⚠️ Please enter blood pressure as 120/80.";
        testValue.classList.add("input-error");
        return false;
      }
      const systolic = parseFloat(parts[0]);
      const diastolic = parseFloat(parts[1]);
      if (isNaN(systolic) || isNaN(diastolic)) {
        resultBox.textContent = "⚠️ Please enter valid numbers like 120/80.";
        testValue.classList.add("input-error");
        return false;
      }
    } else {
      const num = parseFloat(value);
      if (isNaN(num)) {
        resultBox.textContent = "⚠️ Please enter a valid number.";
        testValue.classList.add("input-error");
        return false;
      }
    }

    testValue.classList.remove("input-error");
    testValue.classList.add("input-ok");
    resultBox.textContent = "";
    return true;
  };

  // Analyze logic
  const analyze = () => {
    if (!validateInput()) return;

    const type = testType.value;
    const value = testValue.value.trim();
    let message = "";

    switch (type) {
      case "cbc": {
        const hb = parseFloat(value); // Hemoglobin
        // Typical adult range: 12–16 g/dL
        if (hb < 12) {
          message = "📉 Low Hemoglobin: may indicate anemia.";
        } else if (hb > 16) {
          message = "📈 High Hemoglobin: may indicate dehydration or other issues.";
        } else {
          message = "✅ Hemoglobin is within the normal range.";
        }
        break;
      }

      case "vitaminD": {
        const d = parseFloat(value); // ng/mL
        // Typical range: 30–100 ng/mL
        if (d < 30) {
          message = "📉 Low Vitamin D: consider sunlight exposure or supplements.";
        } else if (d > 100) {
          message = "📈 Very high Vitamin D: consult your doctor about reducing intake.";
        } else {
          message = "✅ Vitamin D level is within the normal range.";
        }
        break;
      }

      case "glucose": {
        const g = parseFloat(value); // mg/dL fasting
        // Typical fasting ranges:
        // <70 low, 70–100 normal, 101–125 prediabetes (borderline), ≥126 high
        if (g < 70) {
          message = "📉 Low fasting blood sugar: may cause dizziness or weakness.";
        } else if (g <= 100) {
          message = "✅ Fasting blood sugar is within the normal range.";
        } else if (g <= 125) {
          message = "⚠️ Borderline (prediabetes range): consider lifestyle adjustments and recheck.";
        } else {
          message = "📈 High fasting blood sugar: may indicate diabetes. Please consult a doctor.";
        }
        break;
      }

      case "bp": {
        // Expect "120/80"
        const [sysRaw, diaRaw] = value.split("/");
        const systolic = parseFloat(sysRaw);
        const diastolic = parseFloat(diaRaw);

        // Interpret categories (simplified)
        if (systolic < 90 || diastolic < 60) {
          message = "📉 Low blood pressure: may cause fainting or dizziness.";
        } else if (systolic < 120 && diastolic < 80) {
          message = "✅ Blood pressure is in the normal range.";
        } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
          message = "⚠️ Elevated blood pressure: monitor and consider lifestyle changes.";
        } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
          message = "⚠️ Stage 1 hypertension: consider medical advice and monitoring.";
        } else if (systolic >= 140 || diastolic >= 90) {
          message = "📈 Stage 2 hypertension: please consult a doctor.";
        } else {
          message = "ℹ️ Unable to classify. Please verify the numbers.";
        }
        break;
      }

      default:
        message = "⚠️ Unknown test type.";
    }

    resultBox.textContent = message;
  };

  // Wire up events
  testType.addEventListener("change", updatePlaceholder);
  testValue.addEventListener("input", () => {
    // Light validation feedback while typing
    const val = testValue.value.trim();
    if (!val) {
      testValue.classList.remove("input-error", "input-ok");
      resultBox.textContent = "";
      return;
    }
    validateInput();
  });
  analyzeBtn.addEventListener("click", analyze);

  // Initialize
  updatePlaceholder();
});