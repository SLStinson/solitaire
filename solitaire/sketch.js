var cards = [];
var emptySlots = [];
var card;
var previousMouseX = null;
var previousMouseY = null;
var selectedCard = null;
var selectedCardChildren = [];

function setup() {
  createCanvas(1000,800);
  cards.push(new Card(200,200,2,5,0));
  cards.push(new Card(450,200,1,4,1));
  cards.push(new Card(450,400,3,13,2));
  cards.push(new Card(450,700,3,1,3));
  cards.push(new Card(570,400,3,2,4));
  for(var i = 1; i < 8; i++){
    emptySlots.push(new EmptySlot((i*100)+10,200,-i, ((c, _) => c.valueRaw === 13)));
  }
  for(var i = 1; i < 5; i++){
    emptySlots.push(new EmptySlot((i*100)+10,50,-i, ((c, vs) => (vs === null && c.rawValue === 1) || c.valueRaw === vs[vs.length-1].valueRaw+1)));
  }
}

function draw() {
  background(100,200,100);
  
  emptySlots.forEach(s => s.display());
  cards.forEach(c => {
    c.display();
  });
  
  if(selectedCard != null){
    selectedCard.display();
    selectedCardChildren.forEach(c => c.display());
  }
}

function mouseDragged(){
  if(previousMouseX == null || previousMouseY == null){
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }

  if(selectedCard != null){
    var dX = 0;
    var dY = 0;
    if(previousMouseX < mouseX){
      dX+= (mouseX-previousMouseX);
    }
    else if(previousMouseX > mouseX){
      dX-= (previousMouseX-mouseX);
    }

    if(previousMouseY < mouseY){
      dY+= (mouseY-previousMouseY);
    }
    else if(previousMouseY > mouseY){
      dY-= (previousMouseY-mouseY);
    }
    console.log(`${dX},${dY}`);
    selectedCard.setPosition(selectedCard.x+dX, selectedCard.y+dY);
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
        
        var currentChild = selectedCard.child;
        while(currentChild != null) {
          var childCard = cards.find(c => c.id === currentChild);
          selectedCardChildren.push(childCard);
          currentChild = childCard.child;
        }
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
      if(c !== selectedCard && !c.disabled && (mouseX > c.x && mouseY > c.y && mouseX < c.x + 80 && mouseY < c.y + 120)){
        var success = c.setChild(selectedCard);
        if(success){
          cardMoved = true;
        }
      }
    });

    emptySlots.forEach(s => {
      if(s.mouseIsOver(mouseX, mouseY)){
        var success = s.setChild(selectedCard);
        if(success){
          cardMoved = true;
        }
      }
    });

    if(!cardMoved && selectedCard.parent != null){
      selectedCard.removeParent();
      cardMoved = true;
    }

    console.log(cardMoved);
    if(!cardMoved){
      selectedCard.setPosition(selectedCard.previousX, selectedCard.previousY);
    }

    selectedCard = null;
    selectedCardChildren = [];
  }

  previousMouseX = null;
  previousMouseY = null;
}
