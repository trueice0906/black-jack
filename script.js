//Global Variables
var playerHand = [];
var computerHand = [];
var myOutputValue = '';
var cardCounter = 0;
var convert = {
  1: 'Ace',
  11: 'Jack',
  12: 'Queen',
  13: 'King',
};
var shuffledDeck = [];
var computerTotalPoints = 0;
var playerTotalPoints = 0;
var winLoseMessagePlayer = '';
var winLoseMessageComputer = '';
var amountOfDolla = 100;
var capital = document.getElementById("capital");

//Helper Functions
// Randomizing function ranging from 0 to max
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//To make a deck of 52 cards (returning me a cardDeck)
var makeDeck = function () {
  var cardDeck = [];
  var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      if (convert[rankCounter] != null) {
        cardName = convert[rankCounter];
      }
      if (rankCounter > 10) {
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

// Randomizing the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  for (var currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = getRandomIndex(cardDeck.length);
    [cardDeck[currentIndex], cardDeck[randomIndex]] = [
      cardDeck[randomIndex],
      cardDeck[currentIndex],
    ];
  }
  return cardDeck;
};

//Combing my Deck and Card shuffling function into a Shuffled Deck
var makeShuffledDeck = function () {
  var unShuffledDeck = makeDeck();
  var shuffledDeck = shuffleCards(unShuffledDeck);
  return shuffledDeck;
};

//Initial 2 cards dealt to both Computer and Player
var dealCards = function () {
  shuffledDeck = makeShuffledDeck();
  while (cardCounter < 2) {
    var computerCard = shuffledDeck.pop();
    var playerCard = shuffledDeck.pop();
    computerHand.push(computerCard);
    playerHand.push(playerCard);
    cardCounter += 1;
  }
  myOutputValue = "Computer's cards are: <br>";
  for (var i = 0; i < computerHand.length; i++) {
    myOutputValue += computerHand[i].name + ' of ' + computerHand[i].suit;
    if (i < computerHand.length - 1) {
      myOutputValue += ', ';
    }
  }
  myOutputValue += '<br><br> Your cards are: <br>';
  for (var i = 0; i < playerHand.length; i++) {
    myOutputValue += playerHand[i].name + ' of ' + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      myOutputValue += ', ';
    }
  }
  return myOutputValue;
};

//Hits player with 1 card for every click
var hitPlayer = function () {
  myOutputValue = '<br>';
  var i = shuffledDeck.pop();
  playerHand.push(i);
  console.log(playerHand);
  myOutputValue += 'Your cards are: <br>';
  for (var i = 0; i < playerHand.length; i++) {
    myOutputValue += playerHand[i].name + ' of ' + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      myOutputValue += ', ';
    }
  }
  console.log(calculateScores(playerHand));
  return myOutputValue;
};


var calculateScores = function (hand) {
  var totalPoint = 0;
  var hasAce = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value != null) {
      totalPoint += hand[i].value;
      if (hand[i].name === 'Ace') {
        hasAce += 1;
      }
    }
  }

  for (var j = 0; j < hasAce; j++) {
    if (totalPoint + 10 <= 21) {
      totalPoint += 10;
    }
  }
  return totalPoint;
};

var checkHandHasNatural = function () {
  var computerCards = `Computer cards are ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}`;
  var playerCards = `Your cards are, ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}`;

  if (superNatural(playerHand)) {
    myOutputValue = `SUPER-NATURAL! <br><br> Player has 2 Ace <br><br> ${computerCards}`;
    amountOfDolla += 10;
    return true;
  } else if (natural(playerHand, playerTotalPoints)) {
    myOutputValue = `You've got a NATURAL!<br><br> ${playerCards} <br><br> ${computerCards}`;
    amountOfDolla += 10;
    return true;
  }

  if (superNatural(computerHand)) {
    myOutputValue = `Computer has gotten a SUPER-NATURAL!<br><br> Computer has 2 Ace <br><br> ${playerCards}`;
    amountOfDolla -= 10;
    return true;
  } else if (natural(computerHand, computerTotalPoints)) {
    myOutputValue = `Computer has gotten a NATURAL!<br><br> ${computerCards} <br><br> ${playerCards}`;
    amountOfDolla -= 10;
    return true;
  }
};

var superNatural = function (hand) {
  if (hand[0].name === 'Ace' && hand[1].name === 'Ace') {
    return true;
  }
};

var natural = function (hand, handTotalPoints) {
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].name === 'Ace' && handTotalPoints == 21) {
      return true;
    }
  }
};

//Computer decision on whether to hit or stay, after player is 'ready'
var computerDecision = function (computerHand, shuffledDeck) {
  while (computerTotalPoints < 17) {
    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);
    computerTotalPoints = calculateScores(computerHand);
  }
  return;
};

var winloseMessage = function () {
  winLoseMessagePlayer = 'Your cards are: <br>';
  winLoseMessageComputer = "Computer's cards are: <br>";

  for (var i = 0; i < playerHand.length; i++) {
    winLoseMessagePlayer += playerHand[i].name + ' of ' + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      winLoseMessagePlayer += ', ';
    }
  }

  for (var i = 0; i < computerHand.length; i++) {
    winLoseMessageComputer +=
      computerHand[i].name + ' of ' + computerHand[i].suit;
    if (i < computerHand.length - 1) {
      winLoseMessageComputer += ', ';
    }
  }
};

var tie = function () {
  myOutputValue = `It's a draw! Both have ${playerTotalPoints} points. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
};

var win = function () {
  amountOfDolla+=10;
  myOutputValue = `Player has ${playerTotalPoints} and wins. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
};

var lose = function () {
  amountOfDolla-=10;
  myOutputValue = `Computer has ${computerTotalPoints} and wins. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
};

var busted = function () {
  if (playerTotalPoints > 21 && computerTotalPoints < 21) {
    amountOfDolla -= 10;
    myOutputValue = `Player busted! <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else if (playerTotalPoints < 21 && computerTotalPoints > 21) {
    amountOfDolla += 10;
    myOutputValue = `Computer busted! <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else {
    myOutputValue = `Both bust, it's a draw!! <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  }
};

//Score comparing function - winLoseDraw + winloseMessage for both sides
//Scenario - 1) player is 21 n under, less than comp due to comp explode
var winLoseDraw = function () {
  winloseMessage();

  if (playerTotalPoints <= 21 && computerTotalPoints <= 21) {
    if (playerTotalPoints == computerTotalPoints) {
      tie();
    } else if (playerTotalPoints > computerTotalPoints) {
      win();
    } else {
      lose();
    }
  } else {
    busted();
  }
};

var resetGame = function () {
  playerTotalPoints = 0;
  computerTotalPoints = 0;
  playerHand = [];
  computerHand = [];
  cardCounter = 0;
};

var main = function (input) {
  capital.innerHTML = `Capital: ${amountOfDolla}`
  if (cardCounter == 0) {
    dealCards();
    playerTotalPoints = calculateScores(playerHand);
    computerTotalPoints = calculateScores(computerHand);
    if (checkHandHasNatural()) resetGame();
  } else if (cardCounter == 2 && input == 'ready') {
    playerTotalPoints = calculateScores(playerHand);
    computerDecision(computerHand, shuffledDeck);
    winLoseDraw();
    capital.innerHTML = `Capital: ${amountOfDolla}`
    console.log(`computers cards are`, computerHand);
    console.log(`computers total points,`, computerTotalPoints);
    resetGame();
  }
  console.log(cardCounter);
  return myOutputValue;
};
