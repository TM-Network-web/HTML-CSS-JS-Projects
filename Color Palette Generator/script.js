const generateBtn =document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");


generateBtn.addEventListener("click",genratePalette);
paletteContainer.addEventListener("click",function(e){


    if(e.target.classList.contains("copy-btn")){
        const hexValue  =  e.target.previousElementSibling.textContent;
        
        navigator.clipboard.writeText(hexValue).then(()=>{
            showCopySuccess(e.target);
        }).catch((err)=>{console.log(err)});
    }else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

        navigator.clipboard.writeText(hexValue).then(()=>{
            showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"));
        }).catch((err)=>{
            console.log(err);
        })
    }
   


})

function genratePalette(){
    const colors = [];

    for(let i=0;i<5;i++){
        colors.push(generateRandomColor());
    }

    updateColor(colors);
}

function generateRandomColor(){

    const letters = "0123456789ABCDEF";
    let color="#";

    for(let i=0;i<6;i++){
        color+= letters[Math.floor(Math.random()*16)];
    }

    return color;

}

function updateColor(colors){

    const colorBoxes = document.querySelectorAll(".color-box");
 
    colorBoxes.forEach((box,index)=>{
   let color = colors[index];

   const colorDiv = box.querySelector(".color");
   const hexValue = box.querySelector(".hex-value");
   colorDiv.style.backgroundColor = color;
   hexValue.textContent = color; 
    });

}

function showCopySuccess(elem){

    elem.classList.add("fas", "fa-check");
    elem.classList.remove("far", "fa-copy");

    elem.style.color = "#48BB78";

    setTimeout(()=>{
        elem.classList.remove("fas", "fa-check");
        elem.classList.add("far", "fa-copy");
        elem.style.color = "";
    },1500)
}