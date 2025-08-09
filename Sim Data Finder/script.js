const phoneNumber = document.getElementById('phone-number');
const resultBox = document.querySelector('.result-box');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener("click", getSimDetail);


async function getSimDetail() {
  let number = phoneNumber.value;
resultBox.innerHTML = "";
resultBox.innerHTML = "<p>Please wait for some Moments</p>";
  if(number.trim()==="" && number.trim < 12){return};
  let Api = `https://anoncyberwarrior.com/acwtools.php?num=${number}`;


  let res = await fetch(Api);
  let data = await res.json();


  resultBox.innerHTML = "<p>Please wait for some Moments</p>";
  if (data.Name || data.CNIC || data.Address || data.Numbers) {

    resultBox.innerHTML = "";

    resultBox.innerHTML = `
<p><span>Name:</span> ${data.Name}</p>
<p><span>CNIC:</span> ${data.CNIC}</p>
<p><span>Address:</span> ${data.Address}</p>
<p><span>Phone Number:</span> 0${data.Numbers}</p>
    `;
  }
  else if (data.message) {
     resultBox.innerHTML = "";
    resultBox.innerHTML = `<p>${data.message}</p>`
  }
  else (!data)
  console.log("Something went wrong");

}

