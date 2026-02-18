let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
//initially give has not started and level is also 0
let btns = ["yellow","green","red","purple"];
//all avialable btns which can be clicked let it be in an array
//of indices 0,1,2,3

//now document kei upar koye bhi key press ho toh voh detect ho jaye or game stsrt ho jaye//
let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
  if(started == false) {
    console.log("game is started");
    started = true;
    //since game ko ek hei baar start karna hai isleye loop lagaya//
     levelUp();
     //jaise hei game start hua level up fn ko call kar diye
  }
}); 

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  },250);
  //button kei class mei flash ko add kar denge 
  // fer ek 0.25sec kei baad
  //fer sei flash ko remove kar denge using fn
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  },250);
}

//this is for user clicked 
//button that is if a button is clicked
//than green flash will be displayed


function levelUp() {
    //user seq ko reset karna hai user ko sare btns 
    // fer sei click karne honge ek level kei baad
    userSeq = [];
  
    level++;
  //level update hojaye , h2 bhi update hoajye level show kar so access h2 ,
    h2.innerText = `Level is ${level}`;


// background color of that pressed random key should be white for some millli seconds
  let randIdx = Math.floor(Math.random()*4);
  // 0 sei 3 takh ek random index i.e number ko nikalana hai 
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  //choosing randm btn which is to be pressed before flashing
  
//   console.log(randColor);
//   console.log(randIdx);
//   console.log(randbtn);

//now in gameSeq = new random colors generated
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randbtn);
}
function checkAns(idx) {
    //console.log("curr level :",level);

    if(userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
       // console.log("same value");
    } else {
        h2.innerHTML =`Game Over!Your score was <b>${level}</b> <br>Press any key to start.`;
//jaise hei game over ho jata reset karna padega
      

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);

        reset();
    }  
}
function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);


    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(btn);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    //fn reset kya karega 
    started = false;
    gameSeq =[];
    userSeq = [];
    level = 0;
}