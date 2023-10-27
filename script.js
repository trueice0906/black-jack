//Global Variables
var playerCards = [];
var computerCards = [];
var myOutputValue = ``;
var cardCounter = 0;
var convert = {
  1: "Ace",
  11: "Jack",
  12: "Queen",
  13: "King",
};

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
      if (convert[rankCounter] != null) {
        cardName = convert[rankCounter];
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
  var shuffledDeck = makeShuffledDeck();
  while (cardCounter < 2) {
    var computerCard = shuffledDeck.pop();
    var playerCard = shuffledDeck.pop();
    computerCards.push(computerCard);
    playerCards.push(playerCard);
    cardCounter += 1;
  }
  myOutputValue = "Computer's cards are: <br>";
  for (var i = 0; i < computerCards.length; i++) {
    myOutputValue += computerCards[i].name + " of " + computerCards[i].suit;
    if (i < computerCards.length - 1) {
      //Delimiter for myOutputValue's `,`
      myOutputValue += ", ";
    }
  }
  myOutputValue += "<br><br> Your cards are: <br>";
  for (var i = 0; i < playerCards.length; i++) {
    myOutputValue += playerCards[i].name + " of " + playerCards[i].suit;
    if (i < playerCards.length - 1) {
      myOutputValue += ", ";
    }
  }
  return myOutputValue;
};

// var hitPlayer = function () {
//   console.log(`this works`);
// };

var main = function (input) {
  dealCards();
  console.log(`computers cards are`, computerCards);
  console.log(`players cards are,`, playerCards);
  return myOutputValue;
};
