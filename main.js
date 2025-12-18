document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");
  const labInfoDiv = document.getElementById("lab-info");
  const testName = document.getElementById("testname");
  const description = document.getElementById("description");
  const condition = document.getElementById("condition");
  const tubeColor = document.getElementById("tubecolor");
  const container = document.getElementById("container");
  const testNameInput = document.getElementById("query");
  const suggestions = document.getElementById("suggestions");

  testNameInput.addEventListener("input", function () {
    const inputValue = testNameInput.value.trim();
    fetch("info.json")
      .then((response) => response.json())
      .then((data) => {
        suggestions.innerHTML = "";
        for (const key in data) {
          if (
            key.toLowerCase().includes(inputValue.toLowerCase()) &&
            inputValue !== ""
          ) {
            suggestions.innerHTML += `<li class="list-group-item" id="${key}" onclick="testNameInput.value='${key}';suggestions.innerHTML = ''">${key}</li>`;
          }
        }
      });
  });

  searchButton.addEventListener("click", function () {
    const testNameValue = testNameInput.value.trim().toLowerCase();
    fetch("info.json")
      .then((response) => response.json())
      .then((data) => {
        if (data[testNameValue]) {
          const testInfo = data[testNameValue];

          if (testInfo.cond === false) {
            testInfo.cond = "N/A";
          }
          testName.textContent = testInfo.testname.toUpperCase();
          description.textContent = testInfo.description;
          condition.textContent = testInfo.cond;
          tubeColor.textContent = testInfo.tubecolor;
          container.textContent = testInfo.container;
        } else {
          alert("Test not found.");
        }
      });
  });
});
