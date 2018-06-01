/*
 * Create a list that holds all of your cards
 */

 const startTime = performance.now(); // start time to calculate the total load time

//function to reload the window - To replay the game
 function reload(){
	location.reload();
 }

 let user = window.prompt("Please enter your name"); //Storing the name of the player

 const result = document.querySelector(".result"); //for result slide which comes at the end of the game

 const stars = document.querySelector(".stars"); //3 Stars

 const firstStar = stars.querySelectorAll("i")[0];

 const secondStar = stars.querySelectorAll("i")[1];

 const thirdStar = stars.querySelectorAll("i")[2];

 const repeat = document.querySelector(".fa-repeat");

 const timer = document.querySelector(".timer");

 let secs = 0;

 let mins = 0;

 let secsFirstZero = 0;

 let minsFirstZero = 0;

 let timerBoolean = true;

 const deck = document.querySelector(".deck");

 let openCards = [];

 let matchedCards = [];

 repeat.addEventListener("click", reload);

 let moves = 0;

 let numOfMoves = document.querySelector(".moves");

 const cards = [
				"fa-diamond","fa-diamond",
				"fa-paper-plane-o","fa-paper-plane-o",
				"fa-anchor","fa-anchor",
				"fa-bolt","fa-bolt",
				"fa-cube","fa-cube",
				"fa-leaf","fa-leaf",
				"fa-bicycle","fa-bicycle",
				"fa-bomb","fa-bomb"
			 ];

function initGame(){
		const deck = document.querySelector(".deck");
		let cardHTML=shuffle(cards).map(function(card){
			return generateCard(card);
		});
		deck.innerHTML = cardHTML.join("");
};

initGame();

function generateCard(card){
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`; 
}

const allCards=document.querySelectorAll(".card");

let currentOpenCards = 0;

allCards.forEach(function(card){
	card.addEventListener("click",function(){
		if(currentOpenCards<2){
		if(timerBoolean){
					 	var setInt = setInterval(function(){
					 		if(matchedCards.length<16){
						secs++
						if(secs>9){
							secsFirstZero="";
						}
						if(secs==60){
							secs=0;
							secsFirstZero=0;
							mins+=1;
						}
						if(mins>9){
							minsFirstZero="";
						}
						timer.innerHTML=`${minsFirstZero}${mins}:${secsFirstZero}${secs}`;
		}
				},1000);
		}
		timerBoolean=false;
		if(!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")) {
			currentOpenCards++;
			card.classList.add("open","show");
			openCards.push(card);
				
				if(openCards.length==2){
					++moves;
									if(moves>16){
										thirdStar.style.color="black";
									}
									if(moves>24){
										secondStar.style.color="black";
									}

					numOfMoves.innerHTML=moves;
			
						//if cards don't match
						if(openCards[0].querySelector("i").classList.value!==openCards[1].querySelector("i").classList.value) {
								setTimeout(function(){
								openCards[0].classList.add("wrong");
								openCards[1].classList.add("wrong");
								},1000);

								setTimeout(function(){
								openCards[0].classList.remove("open");
								openCards[1].classList.remove("open");

								setTimeout(function(){
								openCards[0].classList.remove("show");
								openCards[1].classList.remove("show");
								openCards=[]; //openCards array is emptied
								currentOpenCards=0;
								},300);

								},1000);
						}

						//if cards match
						else {	
								openCards[0].classList.remove("open");
								openCards[0].classList.remove("show");
								openCards[1].classList.remove("open");
								openCards[1].classList.remove("show");
								openCards[0].classList.add("right");
								openCards[1].classList.add("right");
								openCards[0].classList.add("match");
								openCards[1].classList.add("match");
								matchedCards.push(...openCards);
								if(matchedCards.length==16) {
									result.innerHTML=`CONGRATULATIONS ${user.toUpperCase()}!!!<br>YOU WON!!!
									TIME TAKEN ${minsFirstZero}${mins}:${secsFirstZero}${secs}
									IN ${moves} MOVES<br><p class="playAgain">PLAY AGAIN</p>`;
									result.style.visibility="visible";
									confettiAnimation();
								};
								openCards=[]; //openCards array is emptied
								currentOpenCards=0;
						}
				}
		}
		}
	});
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



function confettiAnimation(){
const playAgain = document.querySelector(".playAgain");
playAgain.addEventListener("click", reload);

document.querySelector("#canvas").style.visibility="visible";
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {

  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();
}

const endTime = performance.now(); // end time to calculate the total load time
console.log(endTime-startTime); //logs out the total time taken to load the DOM
