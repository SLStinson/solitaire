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
      noStroke();
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
        return true;
      }
      return false;
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