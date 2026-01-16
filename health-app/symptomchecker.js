// قائمة أعراض تجريبية (لو مش عندك syptoms.json)
let symptomsList = [
  "fever",
  "back pain",
  "shortness of breath",
  "insomnia",
  "weight loss",
  "nausea",
  "vomiting",
  "cough",
  "headache"
];

let selectedSymptoms = [];

// عند الكتابة في مربع البحث
document.getElementById('symptomInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const suggestions = symptomsList.filter(s => s.startsWith(query)).slice(0, 5);

  const suggestionBox = document.getElementById('suggestions');
  suggestionBox.innerHTML = suggestions.map(s =>
    `<div onclick="addSymptom('${s}')">${s}</div>`
  ).join('');
});

// إضافة العرض المختار
function addSymptom(symptom) {
  if (!selectedSymptoms.includes(symptom)) {
    selectedSymptoms.push(symptom);

    const list = document.getElementById('selectedList');
    const li = document.createElement('li');
    li.textContent = symptom;
    list.appendChild(li);
  }
  document.getElementById('symptomInput').value = '';
  document.getElementById('suggestions').innerHTML = '';
}