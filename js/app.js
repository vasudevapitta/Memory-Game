/*
 * Create a list that holds all of your cards
 */

 function reload(){
	location.reload();
 }

 let user = window.prompt("Please enter your name");

 const result = document.querySelector(".result");

 const stars = document.querySelector(".stars");

 const firstStar = stars.querySelectorAll("i")[0];

 const secondStar = stars.querySelectorAll("i")[1];

 const thirdStar = stars.querySelectorAll("i")[2];

 const startTime = performance.now();

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

const endTime = performance.now();
console.log(endTime-startTime);
