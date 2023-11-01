//Global Variables
var playerHand = [];
var computerHand = [];
var myOutputValue = "";
var cardCounter = 0;
var convert = {
  1: "Ace",
  11: "Jack",
  12: "Queen",
  13: "King",
};
var shuffledDeck = [];
var computerTotalPoints = 0;
var playerTotalPoints = 0;

//Helper Functions
// Randomizing function ranging from 0 to max
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//To make a deck of 52 cards (returning me a cardDeck)
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
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
  console.log(shuffledDeck);
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
    myOutputValue += computerHand[i].name + " of " + computerHand[i].suit;
    if (i < computerHand.length - 1) {
      myOutputValue += ", ";
    }
  }
  myOutputValue += "<br><br> Your cards are: <br>";
  for (var i = 0; i < playerHand.length; i++) {
    myOutputValue += playerHand[i].name + " of " + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      myOutputValue += ", ";
    }
  }
  return myOutputValue;
};

//Hits player with 1 card for every click
var hitPlayer = function () {
  myOutputValue = "<br>";
  var i = shuffledDeck.pop();
  playerHand.push(i);
  console.log(playerHand);
  myOutputValue += "Your cards are: <br>";
  for (var i = 0; i < playerHand.length; i++) {
    myOutputValue += playerHand[i].name + " of " + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      myOutputValue += ", ";
    }
  }
  console.log(calculateScores(playerHand));
  return myOutputValue;
};

// Ace rank/values changes in different conditions
var aceConditions = function (hand) {
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value === 1) {
      if (hand.length == 2) {
        hand[i].value = 11;
      } else if (hand.length == 3) {
        hand[i].value = 10;
      } else if (hand.length >= 4) {
        hand[i].value = 1;
      }
    }
  }
};

//To calculate total points of player and computer
var calculateScores = function () {
  aceConditions(playerHand);
  aceConditions(computerHand);
  playerTotalPoints = 0;
  computerTotalPoints = 0;
  for (var i = 0; i < playerHand.length; i++) {
    if (playerHand[i].value != null) {
      playerTotalPoints += playerHand[i].value;
    }
  }
  for (var i = 0; i < computerHand.length; i++) {
    if (computerHand[i].value != null) {
      computerTotalPoints += computerHand[i].value;
    }
  }
  return {
    playerTotalPoints,
    computerTotalPoints,
  };
};

//Happens in the event of "Natural-BANLUCK"
var natural = function () {
  calculateScores();
  for (var i = 0; i < playerHand.length; i++) {
    if (playerHand[0].name === "Ace" && playerHand[1].name === "Ace") {
      myOutputValue = `SUPER-NATURAL! <br><br> Player has 2 Ace <br><br> Computer cards are ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}`;
    } else if (playerHand[i].name === "Ace" && playerTotalPoints >= 21) {
      myOutputValue = `You've got a NATURAL!<br><br> Your cards are, ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit} <br><br> Computer cards are, ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}`;
    }
  }

  for (var i = 0; i < computerHand.length; i++) {
    if (computerHand[i].name === "Ace" && computerTotalPoints >= 21) {
      myOutputValue = `Computer has gotten a NATURAL!<br><br> Computer cards are, ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit} <br><br> Your cards are, ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}`;
    }
  }
  return myOutputValue;
};

//Computer decision on whether to hit or stay, after player is 'ready'
var computerDecision = function (computerHand, shuffledDeck) {
  aceConditions(computerHand);
  while (computerTotalPoints < 17) {
    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);
    aceConditions(computerHand);
    calculateScores();
  }
};

//Score comparing function - winLoseDraw
//Scenario - 1) player is 21 n under, less than comp due to comp explode
var winLoseDraw = function () {
  var winLoseMessagePlayer = "Your cards are: <br>";
  var winLoseMessageComputer = "Computer's cards are: <br>";

  for (var i = 0; i < playerHand.length; i++) {
    winLoseMessagePlayer += playerHand[i].name + " of " + playerHand[i].suit;
    if (i < playerHand.length - 1) {
      winLoseMessagePlayer += ", ";
    }
  }

  for (var i = 0; i < computerHand.length; i++) {
    winLoseMessageComputer +=
      computerHand[i].name + " of " + computerHand[i].suit;
    if (i < computerHand.length - 1) {
      winLoseMessageComputer += ", ";
    }
  }

  if (playerTotalPoints <= 21 && playerTotalPoints > computerTotalPoints) {
    myOutputValue = `Player has ${playerTotalPoints} and wins. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else if (
    computerTotalPoints <= 21 &&
    computerTotalPoints > playerTotalPoints
  ) {
    myOutputValue = `Computer has ${computerTotalPoints} and wins. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else if (
    playerTotalPoints <= 21 &&
    computerTotalPoints <= 21 &&
    playerTotalPoints === computerTotalPoints
  ) {
    myOutputValue = `It's a draw! Both have ${playerTotalPoints} points. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else if (playerTotalPoints > 21 && computerTotalPoints <= 21) {
    myOutputValue = `Player explode! Computer wins.<br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer} `;
  } else if (computerTotalPoints > 21 && playerTotalPoints <= 21) {
    myOutputValue = `Computer explode! Player wins. <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  } else if (playerTotalPoints > 21 && computerTotalPoints > 21) {
    myOutputValue = `Both bust, it's a draw!! <br><br> ${winLoseMessagePlayer} <br><br> ${winLoseMessageComputer}`;
  }
};

var main = function (input) {
  if (cardCounter == 0) {
    dealCards();
    natural();
    console.log(`computers cards are`, computerHand);
    console.log(`players cards are,`, playerHand);
    console.log(`scores are as:`, calculateScores(playerHand, computerHand));
    cardCounter = 2;
  } else if (cardCounter == 2 && input == "ready") {
    computerDecision(computerHand, shuffledDeck);
    winLoseDraw();
    console.log(`computers cards are`, computerHand);
    console.log(`computers total points,`, computerTotalPoints);
  }
  console.log(cardCounter);
  return myOutputValue;
};
