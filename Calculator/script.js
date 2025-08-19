let display = document.querySelector('.display');

function appendvalue(text){
    if(display.innerText === '0' || display.innerText === 'Error' || display.innerText === 'Infinity'){
        display.innerText=text;
        return;
    } else
   display.innerText = `${display.innerText}${text}`;
}
function displayclear(){
    display.innerText='0';
}

function calculate(){
    try{
   display.innerText= eval(display.innerText);
    }
    catch(error){
        display.innerText = 'Error';
    }
}


