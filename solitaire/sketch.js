var cards = [];
var card;
var previousMouseX = null;
var previousMouseY = null;
var selectedCard = null;;

function setup() {
  createCanvas(1000,800);
  cards.push(new Card(200,200,2,5,0));
  cards.push(new Card(450,200,1,4,1));
  // card = new Card(200,200,2,5);
}

function draw() {
  background(0);
  // card.display();
  cards.forEach(c => {
    c.display();
  });
}

class Card{
  constructor(x, y, suit, value, id){
    this.id = id;
    this.x = x;
    this.y = y;
    this.suitRaw = suit;
    this.valueRaw = value;
    this.suit = this.getSuit(suit);
    this.value = this.getValue(value);
    this.parent = null;
    this.child = null;
  }

  display(){
    fill(255);
    rect(this.x,this.y,80,120);
    fill(0);
    text(this.value + " " + this.suit, this.x+20, this.y+10);
    text(this.parent != null, this.x+20, this.y+20);
    text(this.child != null, this.x+20, this.y+45);
  }

  getValue(value){
    switch(value){
      case 11:
        return "Jack";
      case 12:
        return "Queen";
      case 13:
        return "King";
      case 1:
        return "Ace";
      default:
        return value;
    }
  }

  getSuit(suit){
    switch(suit){
      case 0:
        return "Clubs";
      case 1:
        return "Hearts";
      case 2:
        return "Spades";
      case 3:
        return "Diamonds";
    }
  }

  setChild(card){
    if(card.valueRaw == this.valueRaw-1 && this.isOppositeSuit(card.suitRaw)){
      this.child = card.id;
      card.setPosition(this.x, this.y+20);
      card.setParent(this.id);
    }
  }

  setParent(id){
    this.parent = id;
  }

  removeParent(){
    var card = cards.find(c => c.id === this.parent);
    console.log(card);
    card.removeChild();
    this.parent = null;
  }

  removeChild(){
    console.log("did this");
    this.child = null;
  }

  setPosition(x,y){
    this.x = x;
    this.y = y;
  }

  isOppositeSuit(suit){
    if(this.suitRaw == 0 || this.suitRaw == 2){
      return suit == 1 || suit == 3;
    }
    else if(this.suitRaw == 1 || this.suitRaw == 3) {
      return suit == 0 || suit == 3;
    }
  }
}

function mouseDragged(){
  if(previousMouseX == null || previousMouseY == null){
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }

  if(selectedCard != null){
    if(previousMouseX < mouseX){
      selectedCard.x+= (mouseX-previousMouseX);
    }
    else if(previousMouseX > mouseX){
      selectedCard.x-= (previousMouseX-mouseX);
    }

    if(previousMouseY < mouseY){
      selectedCard.y+= (mouseY-previousMouseY);
    }
    else if(previousMouseY > mouseY){
      selectedCard.y-= (previousMouseY-mouseY);
    }
  }
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function mousePressed(){
  var cardSelected = false;
  cards.forEach(c => {
    if(mouseX > c.x && mouseY > c.y && mouseX < c.x + 80 && mouseY < c.y + 120){
        selectedCard = c;
        selectedCard.previousX = selectedCard.x;
        selectedCard.previousY = selectedCard.y;
        cardSelected = true;
    }
  });

  if(!cardSelected){
    selectedCard = null;
  }
}

function mouseReleased(){
  if(selectedCard != null){
    var cardMoved = false;

    cards.forEach(c => {
      if(c !== selectedCard && (mouseX > c.x && mouseY > c.y && mouseX < c.x + 80 && mouseY < c.y + 120)){
        c.setChild(selectedCard);
        cardMoved = true;
      }
    });

    if(!cardMoved && selectedCard.parent != null){
      console.log("path2");
      selectedCard.removeParent();
      cardMoved = true;
    }

    console.log(cardMoved);
    if(!cardMoved){
      console.log("path3");

      selectedCard.x = selectedCard.previousX;
      selectedCard.y = selectedCard.previousY;
    }

    selectedCard = null;
  }

  previousMouseX = null;
  previousMouseY = null;
}
