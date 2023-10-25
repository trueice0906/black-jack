//Global Variables
var playerCards = [];
var computerCards = [];
var myOutputValue = ``;

//Helper Functions
// Randomizing function ranging from 0 to max
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//To make a deck of 52 cards (returning me a cardDeck)
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Randomizing the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

//Combing my Deck and Card shuffling function into a Shuffled Deck
var makeShuffledDeck = function () {
  var unShuffledDeck = makeDeck();
  var shuffledDeck = shuffleCards(unShuffledDeck);
  return shuffledDeck;
};

//Initial 2 cards dealth to both Computer and Player
var dealCards = function () {
  var cardCounter = 0;
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

var main = function (input) {
  makeShuffledDeck();
  dealCards();
  console.log(`computers cards are`, computerCards);
  console.log(`players cards are,`, playerCards);
  return myOutputValue;
};
