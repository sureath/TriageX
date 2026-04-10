let data = {};

let selectedArea = null;
let selectedPain = null;
let selectedDuration = null;

// اختيار الجسم
document.querySelectorAll(".part").forEach(el => {
  el.addEventListener("click", () => {

    document.querySelectorAll(".part").forEach(p => p.classList.remove("active"));
    el.classList.add("active");

    selectedArea = el.dataset.area;

    document.getElementById("questions").classList.remove("hidden");
  });
});

// نوع الألم
document.querySelectorAll("[data-pain]").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll("[data-pain]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedPain = btn.dataset.pain;
    analyze();
  });
});

// مدة الألم
document.querySelectorAll("[data-duration]").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll("[data-duration]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedDuration = btn.dataset.duration;
    analyze();
  });
});

function analyze() {

  let severity = document.getElementById("severity").value;

  let result = document.getElementById("result");

  let diagnosis = "إجهاد بسيط";
  let color = "#22c55e";

  if (severity > 7 || selectedDuration === "long") {
    diagnosis = "حالة متقدمة تحتاج متابعة";
    color = "#ef4444";
  }

  result.innerHTML = `
  <h2 style="color:${color}">${diagnosis}</h2>
  <p>بناءً على اختيارك لموقع الألم ونوعه ومدته.</p>
  <p>النصيحة: راحة + متابعة الحالة.</p>
  `;

  result.classList.remove("hidden");
}

// متابعة
function followUp() {
  let answer = prompt("هل تحسنت؟");
  if (answer === "لا") {
    alert("يفضل مراجعة مختص");
  } else {
    alert("استمر بنفس العناية");
  }
}
