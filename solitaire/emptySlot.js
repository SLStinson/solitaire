class EmptySlot {
  constructor(x, y, id, childRule, isSuitStack) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.child = null;
    this.childRule = childRule;
  }

  display() {
    noFill();
    stroke(2);
    rect(this.x, this.y, 85, 125);
  }

  mouseIsOver(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + 90 && mouseY > this.y && mouseY < this.y + 120;
  }

  setChild(card) {
    if (this.childRule(card, this.suitStack)) {
      this.child = card.id;
      card.setParent(this.id);
      card.setPosition(this.x + 2, this.y + 2);
      card.disabled = true;
      if (this.isSuitStack) {
        this.addToSuitStack(card);
      }
      return true;
    }

    return false;
  }

  addToSuitStack(card) {
    this.suitStack.push(card);
  }
}

class SuitStack{
  constructor(x,y,id){
    this.x = x;
    this.y = y;
    this.id = id;
    this.stack = [];
  }

  display() {
    noFill();
    stroke(2);
    rect(this.x, this.y, 85, 125);
    this.stack.forEach(c => c.display())
  }
}