class EmptySlot{
    constructor(x,y,id){
      this.x = x;
      this.y = y;
      this.id = id;
      this.child = null;
    }
  
    display(){
      noFill();
      stroke(2);
      rect(this.x,this.y,85,125);
    }
  
    mouseIsOver(mouseX, mouseY){
      return mouseX > this.x && mouseX < this.x + 90 && mouseY > this.y && mouseY < this.y + 120;
    }
  
    setChild(card){
      if(card.valueRaw == 13){
        this.child = card.id;
        card.setParent(this.id);
        card.setPosition(this.x+2, this.y+2);
        console.log("setposition");
        return true;
      }

      return false;
    }
  }