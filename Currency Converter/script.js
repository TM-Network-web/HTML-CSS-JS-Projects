const amount = document.getElementById("amount");
const currencyFrom = document.getElementById("currency-from");
const currencyTo = document.getElementById("currency-to");
const formConverter = document.getElementById("form-container");
const resultContainer = document.getElementById("result-con");

window.addEventListener("load",fetchCurrencies)

async function fetchCurrencies(){
       let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
       let data = await res.json();

       let currencyOptions = Object.keys(data.rates);
       
       currencyOptions.forEach(currency=>{

        let option1 =document.createElement("option");
        option1.textContent = currency;
        currencyFrom.appendChild(option1);

        let option2 = document.createElement("option");
        option2.textContent = currency;
        currencyTo.appendChild(option2);
       })
}


formConverter.addEventListener("submit", convertCurrency)

async function convertCurrency(e){
    e.preventDefault();

    const value = parseFloat(amount.value);
    amount.value = "";

    if(value < 0 ){
        alert("Please enter a valid amount");
        return;
    }

    let currencyFromValue = currencyFrom.value;
    let currencyToValue = currencyTo.value;


    let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFromValue}`);
    let data = await res.json();

    let rate = data.rates[currencyToValue];
    let convertedAmount = (value*rate).toFixed(2);

    resultContainer.innerHTML=`
    <p>${value} ${currencyFromValue} = ${convertedAmount} ${currencyToValue}</p>
    `;

}

