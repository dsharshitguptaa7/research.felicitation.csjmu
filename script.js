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

  const matches = authorsData.filter(a =>
    a.name.toLowerCase().includes(input) || a.id.includes(input)
  );

  if (matches.length === 0) {
    resultDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  matches.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    let titlesHTML = "";
    user.titles.forEach(t => {
      titlesHTML += `<li>${t}</li>`;
    });

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Publications:</strong> ${user.titles.length}</p>

      <ul class="titles">${titlesHTML}</ul>

      <button class="download-btn" onclick="downloadCert('${user.name}')">
        Download Certificate
      </button>
    `;

    resultDiv.appendChild(card);
  });
}

function downloadCert(name) {
  const file = "certificates/" + name + ".pdf";
  window.open(file, "_blank");
}