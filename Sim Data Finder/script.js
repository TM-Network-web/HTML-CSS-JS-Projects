function getSimDetails() {
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const resultBox = document.getElementById('resultBox');
  resultBox.innerHTML = "Loading...";

  if (!phoneNumber) {
    resultBox.innerHTML = "<p class='error'>Please enter a phone number.</p>";
    return;
  }

  fetch(`https://anoncyberwarrior.com/acwtools.php?num=${phoneNumber}`)
    .then(response => response.json())
    .then(data => {
      if (!data || data.error) {
        resultBox.innerHTML = "<p class='error'>No record found for this number.</p>";
      } else {
        let resultHtml = `<div class="success">`;
        for (let key in data) {
          resultHtml += `<strong>${key}:</strong> ${data[key]}<br>`;
        }
        resultHtml += `</div>`;
        resultBox.innerHTML = resultHtml;
      }
    })
    .catch(error => {
      console.error(error);
      resultBox.innerHTML = "<p class='error'>Something went wrong. Try again later.</p>";
    });
}
