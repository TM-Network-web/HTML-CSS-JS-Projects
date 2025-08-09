const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("signup-form");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequired = checkRequired([username,email,password, confirmPassword]);
    let isFormValid = isRequired;

    if(isRequired){

        const isUsernameValid  = checkLength(username,3,15);
        const isPasswordValid = checkLength(password,6,25);
        const isemailValid = checkEmail(email);
        const isPasswordMatch = checkPasswordMatch(password,confirmPassword);

        isFormValid = isUsernameValid && isPasswordValid && isemailValid && isPasswordMatch;
    }

    if(isFormValid){
        alert("Registration Successfully!");

        form.reset();
        document.querySelectorAll(".form-group").forEach(group=>{
            group.className = "form-group";
        });
    }

});

function checkRequired(inputArray){
    let isValid = true;

    inputArray.forEach(input => {
        if(input.value.trim() === ""){

            showError(input,`${formatFieldName(input)} is required`);
            isValid = false;
        }else{

            showSuccess(input);
        }
    });
    return isValid;
}


function formatFieldName(input){
   return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}


function showError(input,msg){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.textContent = msg; 
}


function showSuccess(input){
     const formGroup = input.parentElement;
    formGroup.className = "form-group success";
    const small = formGroup.querySelector("small");
    small.style.marginBottom = "0px";
}


function  checkLength(username,min,max){

    if(username.value.length < min){
        showError(username, `${formatFieldName(username)} must be at least ${min} characters.`);
        return false;
    }else if(username.value.length > max){
        showError(username, `${formatFieldName(username)} must be less than ${max} characters.`);
        return  false;
    }
    else
        showSuccess(username);
        return true;
}


function checkEmail(email) {
  // Email regex that covers most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}


function checkPasswordMatch(pswd, cnPswd) {
  if (pswd.value !== cnPswd.value) {
    showError(cnPswd, "Passwords do not match");
    return false;
  }
  return true;
}