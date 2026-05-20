function playMode(mode) {



  if (mode === "football") {



    alert("Football Imposter is starting!");



    window.location.href = "football.html";



  }



  if (mode === "celebrity") {



    alert("Celebrity Imposter is starting!");



    window.location.href = "celebrity.html";



  }



}



let players = 0;



let minutes = 0;



let currentPlayer = 1;



let imposter = 0;



let chosenWord = "";



let timeLeft = 0;



let timerInterval;



const words = {



  football: [



    "Messi", "Ronaldo", "Penalty", "Goalkeeper", "World Cup",



    "Striker", "Referee", "Yellow Card", "Corner", "Stadium"



  ],



  celebrity: [



    "Drake", "Taylor Swift", "MrBeast", "Zendaya", "The Rock",



    "Eminem", "Rihanna", "Kanye West", "Ariana Grande", "Tom Holland"



  ]



};



function startGame(mode) {



  players = Number(document.getElementById("players").value);



  minutes = Number(document.getElementById("minutes").value);



  if (players < 3) {



    alert("You need at least 3 players.");



    return;



  }



  if (minutes < 1) {



    alert("Enter timer minutes.");



    return;



  }



  currentPlayer = 1;



  imposter = Math.floor(Math.random() * players) + 1;



  chosenWord = words[mode][Math.floor(Math.random() * words[mode].length)];



  document.getElementById("setup").style.display = "none";



  document.getElementById("reveal").style.display = "block";



  updatePlayer();



}



function updatePlayer() {



  document.getElementById("playerText").innerText =



    "Player " + currentPlayer + ", take the laptop";



  document.getElementById("wordText").innerText = "";



  document.getElementById("showBtn").style.display = "inline-block";



  document.getElementById("nextBtn").style.display = "none";



}



function showWord() {



  if (currentPlayer === imposter) {



    document.getElementById("wordText").innerText = "YOU ARE THE IMPOSTER";



  } else {



    document.getElementById("wordText").innerText = chosenWord;



  }



  document.getElementById("showBtn").style.display = "none";



  document.getElementById("nextBtn").style.display = "inline-block";



}



function nextPlayer() {



  currentPlayer++;



  if (currentPlayer > players) {



    document.getElementById("reveal").style.display = "none";



    document.getElementById("timerBox").style.display = "block";



    timeLeft = minutes * 60;



    updateTimer();



  } else {



    updatePlayer();



  }



}



function startTimer() {



  clearInterval(timerInterval);



  timerInterval = setInterval(function () {



    timeLeft--;



    updateTimer();



    if (timeLeft <= 0) {



      clearInterval(timerInterval);



      startVoting();



    }



  }, 1000);



}



function updateTimer() {



  let min = Math.floor(timeLeft / 60);



  let sec = timeLeft % 60;



  document.getElementById("timer").innerText =



    String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");



}



function startVoting() {



  document.getElementById("timerBox").style.display = "none";



  document.getElementById("voteBox").style.display = "block";



  let votes = document.getElementById("votes");



  votes.innerHTML = "";



  for (let i = 1; i <= players; i++) {



    let btn = document.createElement("button");



    btn.innerText = "Vote Player " + i;



    btn.onclick = function () {



      if (i === imposter) {



        document.getElementById("result").innerText =



          "Correct! Player " + imposter + " was the imposter!";



      } else {



        document.getElementById("result").innerText =



          "Wrong! Player " + imposter + " was the imposter. The word was: " + chosenWord;



      }



    };



    votes.appendChild(btn);



    votes.appendChild(document.createElement("br"));



  }



}
