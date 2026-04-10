let data = JSON.parse(localStorage.getItem("agent")) || {
  day: 1
};

let selectedArea = null;
let selectedPain = null;

// اختيار الجسم
document.querySelectorAll(".part").forEach(el => {
  el.addEventListener("click", () => {

    document.querySelectorAll(".part").forEach(p => p.classList.remove("active"));

    el.classList.add("active");
    selectedArea = el.dataset.area;

    document.getElementById("questions").classList.remove("hidden");
  });
});

// اختيار الألم
document.querySelectorAll(".options button").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".options button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedPain = btn.dataset.pain;

    analyze();
  });
});

function analyze() {

  let severity = document.getElementById("severity").value;
  let duration = document.getElementById("duration").value;

  let probability = [];

  // 🔥 تحليل احتمالي
  if (selectedArea === "back" && selectedPain === "tight") {
    probability.push({name:"Muscle Strain", score:0.8});
  }

  if (selectedArea === "head" && selectedPain === "pulse") {
    probability.push({name:"Migraine", score:0.7});
  }

  if (severity > 7 && duration === "long") {
    probability.push({name:"Inflammation", score:0.6});
  }

  // ترتيب
  probability.sort((a,b)=>b.score-a.score);

  render(probability);
  save(probability);
}

function render(prob) {

  let result = document.getElementById("result");

  let html = `<h2>Analysis Result</h2>`;

  prob.forEach(p => {
    html += `<p>${p.name} - ${(p.score*100).toFixed(0)}%</p>`;
  });

  result.innerHTML = html;
  result.classList.remove("hidden");
}

// 🔥 متابعة
function followUp() {

  data.day++;

  let answer = prompt("Has your condition improved? yes / no");

  if (answer === "no") {
    alert("Escalating recommendation: consider medical consultation.");
  } else {
    alert("Good recovery. Continue current care.");
  }

  localStorage.setItem("agent", JSON.stringify(data));
}

function save(prob) {
  data.last = prob;
  localStorage.setItem("agent", JSON.stringify(data));
}
