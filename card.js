function Card(rank,suit) {
	this.rank = rank;
	this.suit = suit;
}
Card.prototype.rankToScore = function() {
	switch(this.rank) {
		case "A":
			return 1
		case "J":
			return 11
		case "Q":
			return 12
		case "K":
			return 13
		default:
			return parseInt(rank)
	}
}
Card.prototype.suitToScore = function() {
	switch(this.suit) {
		case "C":
			return 2
		case "D":
			return 3
		case "H":
			return 4
		case "S":
			return 1
	}
}


function Deck() {
	
	this.cards = [];
	var ranks  = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
	var suits  = new Array("C", "D", "H", "S");

	/* Load cards. Use packs(integer) to load more than one stack */
	this.load = function(packs) {
		for(var i = 0; i < packs; i++) {
	    	for(var j = 0; j < suits.length; j++) {
	      		for(var k = 0; k < ranks.length; k++) {
	    			this.cards.push(new Card(ranks[k], suits[j]));
		        }
		    }
		}
	}
}

/* Shuffle cards using Fisher-Yates. Use times to define how many times the stack should be shuffled */
Deck.prototype.shuffle = function(times) {
	var currentIndex = this.cards.length;
	var temporaryValue, randomIndex;

	for (var i = 0; i < times; i++) {    	
    	while( 0 !== currentIndex) {
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;
    	   	temporaryValue = this.cards[currentIndex];
    		this.cards[currentIndex] = this.cards[randomIndex];
    		this.cards[randomIndex] = temporaryValue;
    	}
    }
}

/* Remove first card returned to the caller */
Deck.prototype.deal = function() {
	if (this.cards.length > 0)
    	return this.cards.shift();
  	else
    	return null;
}


/* Remove any card returned to the caller. Use card_index to specify which one to draw from the array. */
Deck.prototype.draw = function(card_index) {
	 var card;

  	if (card_index >= 0 && card_index < this.cards.length) {
    	card = this.cards[card_index];
    	this.cards.splice(card_index, 1);
  	}
  	else {
    	card = null;
    }

  	return card;
}

/* Count cards */
Deck.prototype.count = function() {
	return this.cards.length
}

/* Add card to the end of stack */
Deck.prototype.add = function(card) {
	this.cards.push(card);
}

/* Combine 2 stacks. Empty combined stack. */
Deck.prototype.combine = function(stack) {
	this.cards = this.cards.concat(stack.cards);
  	stack.cards = new Array();
}


/* extending */
function extend(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
}

//extend(Poker, Deck);
function Poker() {

	this.hand = [];

	this.load(1);
	this.shuffle(5);
}
Poker.prototype = new Deck();
Poker.prototype.constructor = Poker;

/* Draw card */
Poker.prototype.drawCard = function() {
	this.hand.push(this.deal());
}

/* Get current score of hand */
Poker.prototype.getCurrentScore = function() {
	var score = 0;
	for(var i = 0; i < this.hand.length; i++) {
		score = score + this.hand[i].rankToScore();
	}
	return score
}

/* Check if score > 21 */
Poker.prototype.checkCurrentScore = function() {
	if(this.getCurrentScore() > 21) {
		return false
	}
	return true
}

/* Compare hands */
Poker.prototype.compareHands = function(hand1,hand2) {
	if(hand1.getCurrentScore() > hand1.getCurrentScore()) {
		return 'win'
	}
	else if(hand1.getCurrentScore() === hand1.getCurrentScore()) {
		return 'tie'
	}
	return 'lose'
}



function Game(game) {
	this.players = [];
	
	/* Load players */
	this.load = function(number) {
		for(var i = 0; i <= number; i++) {
			this.players.push(this.getGame());
		}
	}

	this.getGame = function() {
		switch(game) {
			case "poker":
				return new Poker()
		}
	}
}








var test = new Poker();
console.log(test);
