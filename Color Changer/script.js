let randombtn = document.querySelector('.randombtn');
let applybtn = document.querySelector('.applybtn');
let searchbox = document.querySelector('#inputcolor');
let colorvalue = document.querySelector('.colorvalue');

let body = document.querySelector('body');


let arr = ['black','pink','burlywood','red','yellow','purple','grey','green','blue','tomato','brown','chocolate',
    'golden','cyan','azure','beige','coral','cornsilk','cornflowerblue','cadetblue'];


function changecolor(color){
body.style.backgroundColor = color;
colorvalue.innerText = color;
}



const handlesearch = ()=>{
let searchvalue = searchbox.value;
changecolor(searchvalue);
}

 applybtn.addEventListener('click',handlesearch);



const genratenumber = ()=>{
     let randomvalue = Math.floor(Math.random()*arr.length);
     return arr[randomvalue];
}

const handlerandom = ()=>{
    let color = genratenumber();
    changecolor(color);
}

 randombtn.addEventListener('click', handlerandom);