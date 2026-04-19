const text = `Welcome
to
Research Excellence
Felicitation & Launch of Research Bulletin

(Volume -02, Issue-01)`;

let index = 0;
const speed = 40;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing").innerHTML += 
      text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

typeEffect();

let authorsData = [];

// Load JSON
fetch("authors_with_titles.json")
  .then(res => res.json())
  .then(data => {
    authorsData = data;
  });

function searchAuthor() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  // 🔥 FIX 1: Empty input check
  if (input === "") {
    resultDiv.innerHTML = `
      <div class="card">
        <p>⚠ Please enter your Name or Scopus ID</p>
      </div>
    `;
    return;
  }

  // 🔥 FIX 2: Minimum length (optional but pro)
  if (input.length < 2) {
    resultDiv.innerHTML = `
      <div class="card">
        <p>⚠ Enter at least 2 characters</p>
      </div>
    `;
    return;
  }

  const matches = authorsData.filter(a =>
    a.name.toLowerCase().includes(input) || a.id.includes(input)
  );

  if (matches.length === 0) {
    resultDiv.innerHTML = `
      <div class="card">
        <p>❌ No results found</p>
      </div>
    `;
    return;
  }

 matches.forEach(user => {
  const card = document.createElement("div");
  card.className = "card";

  let titlesHTML = "";
  user.titles.forEach(t => {
    titlesHTML += `<li>${t}</li>`;
  });

  // 🔥 CERTIFICATE BUTTONS
  let certButtons = "";
  const certs = user.certificates || [];

  certs.forEach((file, index) => {
    certButtons += `
      <button class="download-btn" onclick="downloadCert('${file}')">
        ⬇ Certificate ${index + 1}
      </button>
    `;
  });

  // 🔥 CARD HTML
  card.innerHTML = `
    <h3>${user.name}</h3>
    <p><strong>Scopus ID:</strong> ${user.id}</p>
    <p><strong>Publications:</strong> ${user.titles.length}</p>

    <ul class="titles">${titlesHTML}</ul>

    <div class="cert-buttons">
      ${certButtons}
    </div>
  `;

  // 🔥 IMPORTANT (missing tha)
  resultDiv.appendChild(card);

}); 
}
// ✅ ye closing bracket missing tha
function downloadCert(fileName) {
  const file = "certificates/" + fileName;
  window.open(file, "_blank");
}


function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 50;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 30);
    } else {
      counter.innerText = target;
    }
  };

  update();
});

document.getElementById("searchInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      searchAuthor();
    }
  });
