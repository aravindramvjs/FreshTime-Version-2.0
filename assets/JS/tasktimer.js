// Timer script
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelectorAll(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;


startBtn.forEach((item,index)=>{
    item.addEventListener("click", () => {
        let timeNeeded = existingtask[index].timeneeded;
        for(let i = 0; i < timeNeeded.length; i++){
            if(timeNeeded[i] == 'm' || timeNeeded[i] == 'M'){
                mins = timeNeeded.slice(0, i).trim();
            }
            else if(timeNeeded[i] == 'h' || timeNeeded[i] == 'H'){
                mins = timeNeeded.slice(0, i).trim() * 60;
            }
        }
      
        seconds = mins * 60;
        totalsecs = mins * 60;
        setTimeout(decremenT(), 60);
        // startBtn.style.transform = "scale(0)";
        paused = false;
      });
})



function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
      circle.classList.add("danger");
    }
  } else {
    mins = 0;
    seconds = 0;
    bell.play();
    // let btn = localStorage.getItem("btn");

    // if (btn === "focus") {
    //   startBtn.textContent = "start break";
    //   startBtn.classList.add("break");
    //   localStorage.setItem("btn", "break");
//     } else {
//       startBtn.classList.remove("break");
//       startBtn.textContent = "start focus";
//       localStorage.setItem("btn", "focus");
//     }
//     startBtn.style.transform = "scale(1)";
  }
}



// Setting js
const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");

// focusTimeInput.value = localStorage.getItem("focusTime");
// breakTimeInput.value = localStorage.getItem("breakTime");

// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   localStorage.setItem("focusTime", focusTimeInput.value);
//   localStorage.setItem("breakTime", breakTimeInput.value);
// });

document.querySelector(".reset").addEventListener("click", () => {
//   startBtn.style.transform = "scale(1)";
//   clearTimeout(initial);
//   setProgress(0);
//   mindiv.textContent = 0;
//   secdiv.textContent = 0;
window.location.reload();
});

pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }
  if (paused) {
    paused = false;
    initial = setTimeout("decremenT()", 60);
    pauseBtn.textContent = "pause";
    pauseBtn.classList.remove("resume");
  } else {
    clearTimeout(initial);
    pauseBtn.textContent = "resume";
    pauseBtn.classList.add("resume");
    paused = true;
  }
});

// Progress js
const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}