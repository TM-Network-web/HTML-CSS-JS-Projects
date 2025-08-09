const passwordInput = document.getElementById("password");
const copyButton = document.getElementById("copy-btn");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");

const UpperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input",()=>{
    lengthDisplay.textContent = lengthSlider.value
});


generateButton.addEventListener("click",makePassword);

function makePassword(){
    const length = Number(lengthSlider.value);
    const includeUpperCase = uppercaseCheckbox.checked
    const includeLowerCase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const newPassword = GenerateRandomPassword(length, includeUpperCase,
        includeLowerCase,includeNumbers,includeSymbols
    );
    passwordInput.value = newPassword;

    updateStrengthMeter(newPassword);
}

function GenerateRandomPassword(length, includeUpperCase,
        includeLowerCase,includeNumbers,includeSymbols
    )
    {
        let allCharacters = "";
        if(includeUpperCase){allCharacters += UpperCaseLetters};
        if(includeLowerCase){allCharacters+=lowercaseLetters};
        if(includeNumbers){allCharacters+=numberCharacters};
        if(includeSymbols){allCharacters+=symbolCharacters};

        let password = "";
        for(let i=0;i<length;i++){
            createIndex = Math.floor(Math.random()*allCharacters.length);
            password += allCharacters[createIndex];
        }
        return password;
    }


    copyButton.addEventListener("click",()=>{
        if(!passwordInput.value) return;

        navigator.clipboard.writeText(passwordInput.value).then(()=>{
            showCopySuccess();
        }).catch((error)=>{
            console.log(error);
        })
       
    })


    function showCopySuccess(){

        copyButton.classList.add("fas", "fa-check");
        copyButton.classList.remove("far", "fa-copy");
        copyButton.style.color = "#48bb78"

        setTimeout(()=>{
            copyButton.classList.remove("fas","fa-check");
            copyButton.classList.add("far","fa-copy");
             copyButton.style.color = "";
        },1500);
    }

    window.addEventListener("DOMContentLoaded",makePassword);
    


   function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;

  // here the .min will get the minimum value
  // but this will make sure that "at maximum" you would get 40
  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  // enforce minimum score for every short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  // ensure the width of the strength bar is a valid percentage
  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore <= 40) {
    // weak password
    barColor = "#fc8181";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    // Medium password
    barColor = "#fbd38d"; // Yellow
    strengthLabelText = "Medium";
  } else {
    // Strong password
    barColor = "#68d391"; // Green
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}