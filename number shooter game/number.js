let numofcircle = 70;
let container = document.querySelector('.container');
let timervalue = document.querySelector('.timervalue');
let targetvalue = document.querySelector('.targetvalue');
let scorevalue = document.querySelector('.scorevalue');


let timer = 60;
timerreset();
function timerreset() {
  setInterval(() => {
    if (timer <= 0) {
      container.innerHTML = ` <div>Game Over </div>`;
      return;
    }
    timer--;
    timervalue.innerText = timer;

  }, 1000);
}
let gentarget;

function genratetarget() {
  gentarget = Math.ceil(Math.random() * 10);
  targetvalue.innerText = gentarget;
}

genratetarget();

container.addEventListener('click', function (event) {

  let targetnum = event.target;
  
  if (targetnum.className === 'circle') {


    let num = Number(event.target.innerText);
    if (gentarget === num) {
      
      event.target.innerText='';

      genratetarget();
      let sc = Number(scorevalue.innerText);
      sc += 10;
      scorevalue.innerText = sc;

    }

  }

})



for (let i = 1; i <= numofcircle; i++) {

  let divelem = document.createElement('div');
  divelem.className = 'circle';
  let genum = Math.ceil(Math.random() * 10);
  divelem.innerText = genum;
  container.append(divelem);
}

