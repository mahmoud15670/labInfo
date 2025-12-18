document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");
  const labInfoDiv = document.getElementById("lab-info");
  searchButton.addEventListener("click", function () {
    const testNameInput = document
      .getElementById("query")
      .value.trim()
      .toLowerCase();
    fetch("info.json")
      .then((response) => response.json())
      .then((data) => {
        if (data[testNameInput]) {
          const testInfo = data[testNameInput];

          const testDiv = document.createElement("div");
          testDiv.innerHTML = `<h2>${testInfo.testname}</h2><p>${testInfo.description}</p>`;
          labInfoDiv.appendChild(testDiv);
        } else {
          alert("Test not found.");
        }
      });
  });
});
