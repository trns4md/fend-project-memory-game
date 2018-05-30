/*
 * Create a list that holds all of your cards
 */
const card = [
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-diamond',
    'fa-bomb',
    'fa-bolt',
    'fa-paper-plane-o',
    'fa-bicycle',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-diamond',
    'fa-bomb',
    'fa-bolt',
    'fa-paper-plane-o',
    'fa-bicycle',

];


function makeCard(card) {
    return `<li class="card" data-card= "${card}"><i class= " fa ${card}"></i></li>`;
};
//function makeCard(card) {
//  return '<li class="card"><' + card + '></img src></li>';
//};
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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

//start game



function startGame() {
    const deck = document.querySelector('.deck');
    const cardPic = shuffle(card).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardPic.join('');



}

startGame();

let totalMatches = 0;
let moveCounter = document.querySelector('.moves');
let move = 0;
let kitty = document.querySelectorAll('.card');
const shownCards = [];

//make cards clickable
kitty.forEach(function(card) {
    card.addEventListener('click', function(e) {

        shownCards.push(card);
        card.classList.add('open', 'show');

        //compare cards
        if (shownCards.length === 2) {


            //if they match
            if (shownCards[0].dataset.card == shownCards[1].dataset.card) {
                shownCards[0].classList.add('match');
                shownCards[0].classList.add('open');
                shownCards[0].classList.add('show');

                shownCards[1].classList.add('match');
                shownCards[1].classList.add('open');
                shownCards[1].classList.add('show');

                shownCards.length = 0; //reset array

                totalMatches++;
            } else { //if they don't match
                setTimeout(function() {
                    shownCards.forEach(function(card) {
                        card.classList.remove('open', 'show');

                    });
                    shownCards.length = 0; //reset array

                }, 800);

            }

            countMoves();
        }
        winGame();
    });

});

//reset game
function restartGame() {

    //remove the classes from the cards
    /* kitty.forEach(function(card) {
         let item = document.querySelector('li');
         let names = item.classList;
         
         restart = names.remove('card', false);

     });*/

    //reset moves
    countMoves('0');
    moveCounter.innerHTML = '0';

    //reset star rating

    for (i = 0; i < star.length; i++) {
        star[i].style.visibility = 'visible';
    }

    //clear timer
    clearInterval(interval);
    timer.innerHTML = "0 minutes 0seconds";

    //shuffle the deck 
    startGame();

    //reset total matches
    totalMatches = 0;
}

let star = document.querySelectorAll('.fa-star');
//counting moves
function countMoves() {
    move += 1;
    moveCounter.innerHTML = move;

    if (move == 1) {
        startTimer();
    }
    //star rating

    if (move > 8 && move < 15) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                star[i].style.visibility = 'collapse';
            }
        }
    } else if (move > 15) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                star[i].style.visibility = 'collapse';
            }
        }
    }
};





//timer start
let second = 0;
let minute = 0;
const timer = document.querySelector('.timer');
let interval;
let matches = document.getElementsByClassName('.match');

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = `${minute}"minutes"${second}"seconds"`;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);

}





//congratulations pop up
let congrats = document.querySelector('.modal');
let finishTime = document.getElementById('finishTime');
let starRating = document.getElementById('starRating');
let finalMove = document.getElementById('FinalMoveCount');


function winGame() {
    if (totalMatches === 8) {



        let score = document.querySelector(".stars").innerHTML;
        //show finish time
        finishTime.innerHTML = timer.innerHTML;
        console.log(finishTime);
        clearInterval(interval);
        //show star rating
        starRating.innerHTML = score;
        console.log('starRating');
        //show number of moves
        finalMove.innerHTML = moveCounter.innerHTML;
        console.log('finalMove');
        //close the pop up
        //show modal
        congrats.classList.add('open');
        congrats.style.display = 'flex';

        closeCongrats();
        playAgainOp();

    }
}

let close = document.getElementById('close');

function closeCongrats() {
    close.addEventListener('click', function(e) {
        congrats.style.display = 'none';
    });
}
const playAgain = document.getElementById('playAgain');

function playAgainOp() {
    playAgain.addEventListener('click', function(e) {
        restartGame();
    });
}